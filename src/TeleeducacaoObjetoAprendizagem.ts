import { Integra } from "./Integra";
import { TipoDoEnvio } from "./TipoDoEnvio";

/**
 * Classe responsável por armazenar os dados de objetos de aprendizagem de teleeducação e seus respectivos acessos
 * @since 2.0 Adicionado na versão 2.0 do Serviço REST do SMART (lançado em meados de fevereiro de 2016).
 * @author Allyson Barros
 */
export class TeleeducacaoObjetoAprendizagem {
    codigo_nucleo: string = "";
    mes_referencia: string = "";
    tipo_envio: string = "";
    objetos_aprendizagem: any[] = [];

    constructor(codigo_nucleo: string, mes_referencia: string, tipo_envio: string = TipoDoEnvio.REPROCESSAMENTO) {
        if (!codigo_nucleo) {
            throw new Error("Código do núcleo é obrigatório.");
        }

        this.codigo_nucleo = codigo_nucleo;
        this.mes_referencia = Integra.validateDataReferencia(mes_referencia);
        this.tipo_envio = tipo_envio;
    }

    addObjetoAprendizagem(
        codigo_identificacao: string, data_disponibilizacao: string, disponibilizado_plataforma_telessaude: boolean,
        disponibilizado_ares: boolean, disponibilizado_avasus: boolean, disponibilizado_redes_sociais: boolean,
        disponibilizado_outros: boolean, tipo_objeto: string, tema_codigo_decs: string, url: string, numero_acesso: number,
        tipo_atividade: string
    ) {
        if (!codigo_identificacao) {
            throw new Error("Código de identificação da atividade é obrigatório.");
        }

        if (!Integra.validateDate(data_disponibilizacao)) {
            throw new Error("A data de disponibilização informada não está no formato dd/MM/yyyy HH:mm:ss.");
        }

        let objeto_aprendizagem = {
            id: codigo_identificacao,
            dtdispo: data_disponibilizacao,
            dplataf: disponibilizado_plataforma_telessaude ? "1" : "0",
            dares: disponibilizado_ares ? "1" : "0",
            davasus: disponibilizado_avasus ? "1" : "0",
            drsociais: disponibilizado_redes_sociais ? "1" : "0",
            doutros: disponibilizado_outros ? "1" : "0",
            tipo: tipo_objeto,
            decs: tema_codigo_decs,
            url: url || undefined,
            num: numero_acesso,
            tipo_atividade: tipo_atividade || undefined
        };

        this.objetos_aprendizagem.push(objeto_aprendizagem);
    }
}