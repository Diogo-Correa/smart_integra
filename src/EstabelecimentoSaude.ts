import { Integra, TipoDoEnvio } from "./Integra";
import { EstabelecimentoInterface } from "./interfaces/EstabelecimentoInterface";

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

    atualizarEstabelecimentoSaude(data: EstabelecimentoInterface) {
        const estabelecimento_saude = {
            cnes: data.codigo_cnes,
            tconsul: data.cadastrado_servico_teleconsultoria ? "1" : "0",
            teduca: data.cadastrado_servico_teleeducacao ? "1" : "0",
            tdiagn: data.cadastrado_servico_telediagnostico ? "1" : "0"
        };

        this.estabelecimentos.push(estabelecimento_saude);
    }
}