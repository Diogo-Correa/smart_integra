import { Integra } from "./Integra";
import { TipoDoEnvio } from "./TipoDoEnvio";
import { TeleconsultaInterface } from "./interfaces/TeleconsultaInterface";

/**
 * Classe responsável por armazenar as solicitações de teleconsultoria.
 * @since 2.0 Adicionado na versão 2.0 do Serviço REST do SMART (lançado em meados de fevereiro de 2016).
 * @author Allyson Barros
 */
export class Teleconsultoria {
    codigo_nucleo: string = "";
    mes_referencia: string = "";
    tipo_envio: string = "";
    teleconsultorias: any[] = [];

    /**
     * Construtor da classe
     * @param codigo_nucleo Código CNES de identificação do núcleo cadastrado no SMART.
     * @param mes_referencia Mês de referência para os indicadores informados.
     * @param tipo_envio Tipo do Envio (NA - Novo/Atualização ou RE - Reprocessamento).
     */
    constructor(codigo_nucleo: string, mes_referencia: string, tipo_envio: string = TipoDoEnvio.REPROCESSAMENTO) {
        if (!codigo_nucleo) {
            throw new Error("Código do núcleo é obrigatório.");
        }

        this.codigo_nucleo = codigo_nucleo;
        this.mes_referencia = Integra.validateDataReferencia(mes_referencia);
        this.tipo_envio = tipo_envio;
    }

    /**
     * Adiciona a solicitação de teleconsultoria.
     * A teleconsultoria é identificada exclusivamente pela data da solicitação e o cpf do solicitante.
     * @param dh_solicitacao Data/hora da solicitação da teleconsultoria no formato dd/MM/yyyy HH:MM:SS
     * @param tipo Tipo da solicitação, se Síncrona ou Assíncrona
     * @param canal_acesso_sincrona Canal de acesso, se internet ou telefone
     * @param cpf_solicitante CPF do profissional que solicitou a teleconsultoria
     * @param especialidade_solicitante Código CBO da ocupação do solicitante no momento da solicitação da teleconsultoria
     * @param ponto_telessaude_solicitacao Código CNES do estabelecimento de saúde no qual o profissional solicitante atua
     * @param equipe_do_solicitante Código INE da equipe de saúde na qual o profissional solicitante faz parte
     * @param tipo_profissional Código do tipo de profissional de saúde cadastrado no SMART
     * @param cids Lista com os códigos CID (Classificação Internacional de Doenças).
     * @param ciaps Lista com os códigos CIAP (Classificação Internacional de Assistência Primária).
     * @param dh_resposta_solicitacao Data/hora da resposta da solicitação no formato dd/MM/yyyy HH:MM:SS
     * @param evitou_encaminhamento Se a teleconsultoria evitou o encaminhamento de paciente
     * @param intensao_encaminhamento Se o profissional registrou na teleconsultoria que tinha intenção de encaminhar o paciente
     * @param grau_satisfacao Grau de satisfação do solicitante quanto a resposta da sua teleconsultoria
     * @param resolucao_duvida Se a resposta da teleconsultoria atendeu, atendeu parcialmente ou não atendeu à sua teleconsultoria.
     * @param potencial_sof Se a teleconsultoria tem pontencial para transforma em SOF
     * @param pergunta Texto da Pergunta que originou a teleconsultoria
     * @param resposta Texto da Resposta da teleconsultoria
     * @param ref_resposta Código do Tipo de informação na qual a resposta da solicitação foi baseada
     * @param link_resposta Link da informação na qual a resposta da solicitação foi baseada
     * @param tipo_telediagnostico Código SIA/SIH do exame que originou a Solicitação
     * @param origem_financiamento Código da Origem de Financiamento
     * @param classificacao_solicitacao Código da Classificação da Teleconsultoria
     * @param cpf_teleconsultor CPF do profissional que solicitou a teleconsultoria
     * @param especialidade_teleconsultor Código CBO da ocupação do teleconsultor no momento da solicitação da teleconsultoria
     * @param ponto_telessaude_teleconsultor Código CNES do estabelecimento de saúde no qual o profissional solicitante atua
     */
    addSolicitacao(
        data: TeleconsultaInterface
    ) {
        if (!data.dh_solicitacao || !data.cpf_solicitante) {
            throw new Error("Data/Hora da solicitação e CPF do solicitante são obrigatórios.");
        }

        if (data.tipo === TipoTeleconsultoria.SINCRONA && !data.canal_acesso_sincrona) {
            throw new Error("Canal de acesso síncrono é obrigatório para teleconsultorias síncronas.");
        }

        let teleconsultoria = data;

        this.teleconsultorias.push(teleconsultoria);
    }

    /**
     * Função que valida o mês de referência.
     * @param dataReferencia Mês de referência
     */
    static validateDataReferencia(dataReferencia: string) {
        let mes = dataReferencia.substring(0, 2);
        let ano = dataReferencia.substring(3, 7);
        let data = new Date(parseInt(ano), parseInt(mes) - 1);

        if (data.getFullYear().toString() !== ano || data.getMonth().toString() !== mes) {
            throw new Error("Data de referência inválida.");
        }

        return dataReferencia;
    }
}