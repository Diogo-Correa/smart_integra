import { Integra } from "./Integra";

/**
 * Classe responsável por cadastrar/atualizar os dados de profissionais de saúde.
 */
class ProfissionalSaude {
    codigo_nucleo: string;
    mes_referencia: string;
    tipo_envio: string;
    profissionais: any[];

    constructor(codigo_nucleo: string, mes_referencia: string, tipo_envio: string = TipoDoEnvio.REPROCESSAMENTO) {
        if (Integra.isBlankOrNull(codigo_nucleo)) {
            throw new Error("Código do núcleo é obrigatório.");
        }

        this.codigo_nucleo = codigo_nucleo;
        this.mes_referencia = Integra.validateDataReferencia(mes_referencia);
        this.tipo_envio = tipo_envio;
        this.profissionais = [];
    }

    async addProfissionalSaude(codigo_cns: string, codigo_cpf: string, nome: string, estabelecimento: string, ocupacao: string, equipe_ine: string, tipo_profissional: string, sexo: string) {
        const profissional_saude = {
            cns: codigo_cns,
            cpf: codigo_cpf,
            nome: nome,
            cnes: estabelecimento,
            cbo: ocupacao,
            ine: equipe_ine,
            tprof: tipo_profissional,
            sexo: sexo
        };

        this.profissionais.push(profissional_saude);
    }
}