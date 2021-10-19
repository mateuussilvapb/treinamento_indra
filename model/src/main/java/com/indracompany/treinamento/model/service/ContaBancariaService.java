package com.indracompany.treinamento.model.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.dto.ClienteDTO;
import com.indracompany.treinamento.model.dto.TransferenciaBancariaDTO;
import com.indracompany.treinamento.model.entity.Cliente;
import com.indracompany.treinamento.model.entity.ContaBancaria;
import com.indracompany.treinamento.model.entity.OperacaoConta;
import com.indracompany.treinamento.model.repository.ContaBancariaRepository;
import com.indracompany.treinamento.model.repository.OperacaoContaRepository;

@Service
public class ContaBancariaService extends GenericCrudService<ContaBancaria, Long, ContaBancariaRepository> {

	@Autowired
	private ClienteService clienteService;

	@Autowired
	private ContaBancariaRepository contaBancariaRepository;

	@Autowired
	private OperacaoContaRepository operacaoContaRepository;

	public double consultarSaldo(String agencia, String numeroConta) {
		ContaBancaria c = this.consultarConta(agencia, numeroConta);
		return c.getSaldo();
	}

	public ContaBancaria consultarConta(String agencia, String numeroConta) {
		ContaBancaria c = contaBancariaRepository.findByAgenciaAndNumero(agencia, numeroConta);
		if (c == null) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CONTA_INVALIDA);
		}
		return c;
	}

	public List<OperacaoConta> extratoConta(String agencia, String numero) {
		ContaBancaria conta = consultarConta(agencia, numero);
		List<OperacaoConta> resultado = operacaoContaRepository.findByConta(conta);
		return resultado;
	}



	public List<OperacaoConta> extratoContaPeriodoRepository(String agencia, String numero, String inicio, String fim) {
		ContaBancaria conta = consultarConta(agencia, numero);
		DateTimeFormatter parser = DateTimeFormatter.ofPattern("dd-MM-yyyy");
		LocalDateTime dataInicio = LocalDate.parse(inicio, parser).atStartOfDay();
		LocalDateTime dataFim = LocalDate.parse(fim, parser).atTime(23, 59, 59);
		List<OperacaoConta> resultado = operacaoContaRepository.findByContaAndDataHoraBetween(conta, dataInicio,
				dataFim);
		return resultado;
	}

	public List<ContaBancaria> obterContas(String cpf) {
		ClienteDTO dto = clienteService.buscarClientePorCpf(cpf);
		Cliente cliente = clienteService.buscar(dto.getId());
		List<ContaBancaria> contasDoCliente = contaBancariaRepository.findByCliente(cliente);
		return contasDoCliente;
	}

	@Transactional(rollbackOn = Exception.class)
	public void depositar(String agencia, String numeroConta, double valor) {
		if (valor <= 0) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_VALOR_INVALIDO);
		}
		ContaBancaria conta = this.consultarConta(agencia, numeroConta);
		conta.setSaldo(conta.getSaldo() + valor);
		this.registrarOperacao(agencia, numeroConta, valor, 'C', conta);
		super.salvar(conta);
	}

	public void registrarOperacao(String agencia, String numeroConta, double valor, char tpOperacao,
			ContaBancaria conta) {
		LocalDateTime dataHora = LocalDateTime.now();
		OperacaoConta op = new OperacaoConta();
		op.setDataHora(dataHora);
		op.setConta(conta);
		if (Character.toUpperCase(tpOperacao) == 'C') {
			op.setTpOperacao('C');
			op.setObservacao("Operação de crédito em conta.");
		} else {
			op.setObservacao("Operação de débito em conta.");
			op.setTpOperacao('D');
		}
		op.setValor(valor);
		op.setConta(conta);
		operacaoContaRepository.save(op);
	}

	@Transactional(rollbackOn = Exception.class)
	public void sacar(String agencia, String numeroConta, double valor) {
		if (valor <= 0) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_VALOR_INVALIDO);
		}
		ContaBancaria conta = this.consultarConta(agencia, numeroConta);
		if (conta.getSaldo() < valor) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_SALDO_INEXISTENTE);
		}
		this.registrarOperacao(agencia, numeroConta, valor, 'D', conta);
		conta.setSaldo(conta.getSaldo() - valor);
		super.salvar(conta);
	}

	@Transactional(rollbackOn = Exception.class)
	public void transferir(TransferenciaBancariaDTO dto) {
		if (dto.getAgenciaOrigem().equals(dto.getAgenciaDestino())
				&& dto.getNumeroContaOrigem().equals(dto.getNumeroContaDestino())) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CONTA_INVALIDA);
		}
		this.sacar(dto.getAgenciaOrigem(), dto.getNumeroContaOrigem(), dto.getValor());
		this.depositar(dto.getAgenciaDestino(), dto.getNumeroContaDestino(), dto.getValor());
	}

}
