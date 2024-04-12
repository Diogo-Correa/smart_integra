/**
 * * @author Diogo Correa
 */
export interface TeleconsultaInterface {
    dh_solicitacao: string,
    tipo: TipoTeleconsultoria,
    canal_acesso_sincrona: CanalAcesso,
    cpf_solicitante: string,
    especialidade_solicitante: string,
    ponto_telessaude_solicitacao: string,
    equipe_do_solicitante?: string,
    tipo_profissional: string,
    cids?: string[],
    ciaps: string[],
    dh_resposta_solicitacao: string,
    evitou_encaminhamento: boolean,
    intensao_encaminhamento: boolean,
    grau_satisfacao: string,
    resolucao_duvida: string,
    potencial_sof: boolean,
    pergunta?: string,
    resposta?: string,
    ref_resposta?: string,
    link_resposta?: string,
    tipo_telediagnostico: string,
    origem_financiamento?: string,
    classificacao_solicitacao?: string,
    cpf_teleconsultor?: string,
    especialidade_teleconsultor?: string,
    ponto_telessaude_teleconsultor?: string
}