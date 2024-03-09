import { Integra } from "./Integra";

/**
 * Classe responsável por armazenar os cursos oferecidos por meio da Tele-educação
 * @since 2.0 Adicionado na versão 2.0 do Serviço REST do SMART (lançado em meados de fevereiro de 2016).
 * @author Allyson Barros
 */
class TeleeducacaoCurso {
    codigo_nucleo: string = "";
    mes_referencia: string = "";
    tipo_envio: string = "";
    cursos_teleeducacao: any[] = [];

    constructor(codigo_nucleo: string, mes_referencia: string, tipo_envio: string = TipoDoEnvio.REPROCESSAMENTO) {
        if (!codigo_nucleo) {
            throw new Error("Código do núcleo é obrigatório.");
        }

        this.codigo_nucleo = codigo_nucleo;
        this.mes_referencia = Integra.validateDataReferencia(mes_referencia);
        this.tipo_envio = tipo_envio;
    }

    addCurso(
        identificacao_curso: string, data_inicio: string, data_fim: string, vagas_ofertadas: string, tema: string,
        carga_horaria: string, lista_cpf_matriculados: string[], lista_cpf_formados: string[], lista_cpf_evadidos: string[],
        lista_cpf_reprovados: string[]
    ) {
        if (!identificacao_curso) {
            throw new Error("Código de identificação do curso é obrigatório.");
        }

        if (!Integra.validateDate(data_inicio)) {
            throw new Error("A data de início do curso informada não está no formato dd/MM/yyyy HH:mm:ss.");
        }

        if (data_fim && !Integra.validateDate(data_fim)) {
            throw new Error("A data de encerramento do curso informada não está no formato dd/MM/yyyy HH:mm:ss.");
        }

        let curso = {
            id: identificacao_curso,
            dtini: data_inicio,
            dtfim: data_fim || undefined,
            vagas: vagas_ofertadas,
            decs: tema,
            cargah: carga_horaria,
            cpfs_matri: lista_cpf_matriculados.length > 0 ? lista_cpf_matriculados : undefined,
            cpfs_forma: lista_cpf_formados.length > 0 ? lista_cpf_formados : undefined,
            cpfs_evadi: lista_cpf_evadidos.length > 0 ? lista_cpf_evadidos : undefined,
            cpfs_repro: lista_cpf_reprovados.length > 0 ? lista_cpf_reprovados : undefined
        };

        this.cursos_teleeducacao.push(curso);
    }
}