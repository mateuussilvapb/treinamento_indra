package com.indracompany.treinamento.controller.rest;

import java.text.ParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.indracompany.treinamento.model.dto.DepositoDTO;
import com.indracompany.treinamento.model.dto.SaqueDTO;
import com.indracompany.treinamento.model.dto.TransferenciaBancariaDTO;
import com.indracompany.treinamento.model.entity.ContaBancaria;
import com.indracompany.treinamento.model.entity.OperacaoConta;
import com.indracompany.treinamento.model.service.ContaBancariaService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("rest/contas")
public class ContaBancariaRest extends GenericCrudRest<ContaBancaria, Long, ContaBancariaService> {

	@Autowired
	private ContaBancariaService contaBancariaService;

	@ApiOperation(value = "Essse serviço consulta extrato da conta com a agencia e numero de conta")
	@GetMapping(value = "/consultar-extrato/{agencia}/{conta}", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<OperacaoConta>> consultarExtrato(@PathVariable String agencia,
			@PathVariable String conta) {
		List<OperacaoConta> extrato = contaBancariaService.extratoConta(agencia, conta);
		return new ResponseEntity<>(extrato, HttpStatus.OK);
	}

	@ApiOperation(value = "Essse serviço consulta extrato da conta com a agencia e numero de conta de acordo com um período")
	@GetMapping(value = "/consultar-extrato/por-periodo/{agencia}/{conta}/{inicio}/{fim}", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<OperacaoConta>> consultarExtratoPorPeriodo(@PathVariable String agencia,
			@PathVariable String conta, @PathVariable String inicio, @PathVariable String fim) throws ParseException {
		List<OperacaoConta> extrato = contaBancariaService.extratoContaPeriodoRepository(agencia, conta, inicio, fim);
		return new ResponseEntity<>(extrato, HttpStatus.OK);
	}

	@ApiOperation(value = "Essse serviço consulta o saldo da conta com a agencia e numero de conta")
	@GetMapping(value = "/consultar-saldo/{agencia}/{conta}", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<Double> consultarSaldo(@PathVariable String agencia,
			@PathVariable String conta) {

		double saldo = contaBancariaService.consultarSaldo(agencia, conta);
		return new ResponseEntity<>(saldo, HttpStatus.OK);
	}

	@ApiOperation(value = "Essse serviço consulta as contas de um cliente pelo CPF")
	@GetMapping(value = "/consultar-contas-cliente/{cpf}", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<ContaBancaria>> consultarContasPorCliente(@PathVariable String cpf) {

		List<ContaBancaria> contasCliente = contaBancariaService.obterContas(cpf);
		return new ResponseEntity<>(contasCliente, HttpStatus.OK);
	}

	@ApiOperation(value = "Essse serviço realiza um deposito na conta")
	@PostMapping(value = "/deposito", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<Void> depositar(@RequestBody DepositoDTO dto) {
		contaBancariaService.depositar(dto.getAgencia(), dto.getNumeroConta(), dto.getValor());
		return new ResponseEntity<>(HttpStatus.OK);

	}

	@ApiOperation(value = "Essse serviço realiza um saque na conta")
	@PostMapping(value = "/saque", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<Void> sacar(@RequestBody SaqueDTO dto) {
		contaBancariaService.sacar(dto.getAgencia(), dto.getNumeroConta(), dto.getValor());
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@ApiOperation(value = "Essse serviço realiza uma transferência entre contas")
	@PostMapping(value = "/transferencia", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<Void> sacar(@RequestBody TransferenciaBancariaDTO dto) {
		contaBancariaService.transferir(dto);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
