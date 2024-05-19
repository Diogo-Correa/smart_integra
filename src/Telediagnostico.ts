import { Integra, TipoDoEnvio } from "./Integra";
import { Prioridade } from "./Prioridade";
import { TelediagnosticoInterface } from "./interfaces/TelediagnosticoInterface";

/**
 * Classe com todas as funções necessárias para o recebimento dos dados referentes aos Telediagnósticos do Núcleo.
 * @since 2.0 Adicionado na versão 2.0 do Serviço REST do SMART (lançado em meados de fevereiro de 2016).
 */
export class Telediagnostico {
    public codigoNucleo: string = "";
    public mesReferencia: string = "";
    public tipoEnvio: string = "";
    public telediagnosticos: any[] = [];

    /**
     * Construtor da classe
     * @param codigoNucleo Código CNES de identifiação do núcleo cadastrado no SMART.
     * @param mesReferencia Mês de referência para os indicadores informados.
     * @param tipoEnvio Tipo do Envio (NA - Novo/Atualização ou RE - Reprocessamento).
     */
    constructor(codigoNucleo: string, mesReferencia: string, tipoEnvio: string = TipoDoEnvio.REPROCESSAMENTO) {
        if (Integra.isBlankOrNull(codigoNucleo)) {
            throw new Error("Código do núcleo é obrigatório.");
        }

        this.codigoNucleo = codigoNucleo;
        this.mesReferencia = Integra.validateDataReferencia(mesReferencia);
        this.tipoEnvio = tipoEnvio;
    }

    /**
     * Adicona a solicitação do telediagnóstico
     * O SMART considera um telediagnóstico única pela chave (dataSolicitacao e cpfSolicitante)
     */
    public addSolicitacao(
        data: TelediagnosticoInterface
    ) {
        const telediagnostico: any = {};

        if (!Integra.validateDate(data.dhRealizacaoExame)) {
            throw new Error("A data da realização do exame informada não está no formato dd/MM/yyyy HH:mm:ss.");
        }

        if (!Integra.validateDate(data.dhLaudo)) {
            throw new Error("A data de laudagem informada não está no formato dd/MM/yyyy HH:mm:ss.");
        }

        telediagnostico.dhrexame = data.dhRealizacaoExame;
        telediagnostico.ctexame = data.codigoTipoExame;
        telediagnostico.cequipa = data.codigoEquipamento;
        telediagnostico.tjust = data.tipoJustificativa;
        telediagnostico.pnt = data.pontoTelessaudeComTelediagnostico;
        telediagnostico.scpf = data.cpfSolicitante;
        telediagnostico.scbo = data.especialidadeSolicitante;
        telediagnostico.scnes = data.pontoTelessaudeSolicitacao;
        telediagnostico.dhla = data.dhLaudo;
        telediagnostico.lcpf = data.cpfLaudista;
        telediagnostico.lcbo = data.especialidadeLaudista;
        telediagnostico.lcnes = data.pontoTelessaudeLaudista;
        telediagnostico.pcpf = data.cpfPaciente;
        telediagnostico.pacns = data.cnsPaciente;
        telediagnostico.paibge = data.cidadeMoradiaPaciente;

        if (!Integra.isBlankOrNull(data.origemFinanciamento)) {
            telediagnostico.origem_financiamento = data.origemFinanciamento;
        }

        if (!Integra.isBlankOrNull(data.prioridade)) {
            telediagnostico.prioridade = data.prioridade;
        }

        if (!Integra.isBlankOrNull(data.dhSolicitacao)) {
            telediagnostico.dh_solicitacao = data.dhSolicitacao;
        }

        if (!Integra.isBlankOrNull(data.dhGravacao)) {
            telediagnostico.dh_gravacao = data.dhGravacao;
        }

        if (!Integra.isBlankOrNull(data.dhEntradaFila)) {
            telediagnostico.dh_entrada_fila = data.dhEntradaFila;
        }

        if (!Integra.isBlankOrNull(data.dhSaidaFila)) {
            telediagnostico.dh_saida_fila = data.dhSaidaFila;
        }

        if (!Integra.isBlankOrNull(data.dhVisualizacaoLaudo)) {
            telediagnostico.dh_visualizacao_laudo = data.dhVisualizacaoLaudo;
        }

        if (!Integra.isBlankOrNull(data.classificacaoResultado)) {
            telediagnostico.classificacao_resultado = data.classificacaoResultado;
        }

        this.telediagnosticos.push(telediagnostico);
    }
}