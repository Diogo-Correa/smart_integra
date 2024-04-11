import { Integra, TipoDoEnvio } from "./Integra";

/**
 * Classe responsável por atualizar as informações dos Estabelecimentos de Saúde.
 */
export class EstabelecimentoSaude {
    codigo_nucleo: string;
    mes_referencia: string;
    tipo_envio: string;
    estabelecimentos: any[];

    constructor(codigo_nucleo: string, mes_referencia: string, tipo_envio: string = TipoDoEnvio.REPROCESSAMENTO) {
        if (Integra.isBlankOrNull(codigo_nucleo)) {
            throw new Error("Código do núcleo é obrigatório.");
        }

        this.codigo_nucleo = codigo_nucleo;
        this.mes_referencia = Integra.validateDataReferencia(mes_referencia);
        this.tipo_envio = tipo_envio;
        this.estabelecimentos = [];
    }

    atualizarEstabelecimentoSaude(codigo_cnes: string, cadastrado_servico_teleconsultoria: boolean, cadastrado_servico_teleeducacao: boolean, cadastrado_servico_telediagnostico: boolean) {
        const estabelecimento_saude = {
            cnes: codigo_cnes,
            tconsul: cadastrado_servico_teleconsultoria ? "1" : "0",
            teduca: cadastrado_servico_teleeducacao ? "1" : "0",
            tdiagn: cadastrado_servico_telediagnostico ? "1" : "0"
        };

        this.estabelecimentos.push(estabelecimento_saude);
    }
}