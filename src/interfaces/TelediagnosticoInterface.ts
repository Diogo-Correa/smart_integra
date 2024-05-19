import { Prioridade } from "../Prioridade";

export interface TelediagnosticoInterface {
    dhRealizacaoExame: string;
    codigoTipoExame: string;
    codigoEquipamento: string;
    tipoJustificativa: string;
    pontoTelessaudeComTelediagnostico: string;
    cpfSolicitante: string;
    especialidadeSolicitante: string;
    pontoTelessaudeSolicitacao: string;
    dhLaudo: string;
    cpfLaudista: string;
    especialidadeLaudista: string;
    pontoTelessaudeLaudista: string;
    cpfPaciente: string;
    cnsPaciente: string;
    cidadeMoradiaPaciente: string;
    origemFinanciamento: string;
    prioridade: Prioridade;
    dhSolicitacao: string;
    dhGravacao: string;
    dhEntradaFila: string;
    dhSaidaFila: string;
    dhVisualizacaoLaudo: string;
    classificacaoResultado: string;
}