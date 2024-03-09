import axios, { AxiosRequestConfig } from 'axios';
import { TipoDeDados } from './TipoDados';
import { EstabelecimentoSaude } from './EstabelecimentoSaude';

/**
 * Classe responsável por empacotar os dados e enviá-los para o webservice.
 */
export class Integra {
    private token_autenticacao: string | null = null;

    /**
     * Inicializa uma nova instância da classe com o token de autenticação do Usuário do SMART.
     * @param token_autenticacao 
     */
    constructor(token_autenticacao: string) {
        this.token_autenticacao = token_autenticacao;
    }

    /**
     * Define o token de autenticação do Usuário do SMART.
     * @param token_autenticacao 
     */
    setTokenAutenticacao(token_autenticacao: string) {
        this.token_autenticacao = token_autenticacao;
    }

    /**
     * Método utilizado para enviar dados no formato bruto (JSON ou XML) para o webservice.
     * @param tipoDeDados 
     * @param url 
     * @param dados 
     */
    async enviarDados(tipoDeDados: number, url: string, dados: any) {
        if (this.token_autenticacao != null && this.token_autenticacao != "") {
            if (tipoDeDados == TipoDeDados.JSON) {
                try {
                    const config: AxiosRequestConfig = {
                        headers: {
                            'Authorization': 'Token ' + this.token_autenticacao,
                            'Content-Type': tipoDeDados === TipoDeDados.JSON ? 'application/json' : ''
                        }
                    };
                    const response = await axios.post(url, dados, config);
                    return response.data;
                } catch (error: any) {
                    return error.response.data;
                }
            } else {
                throw new Error("O formato XML ainda não foi implementado.");
            }
        } else {
            throw new Error("Atenção: Você precisa definir o token de autenticação.");
        }
    }

    async buscarDados(url: string) {
        if (this.token_autenticacao != null && this.token_autenticacao != "") {
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Token ${this.token_autenticacao}`,
                    }
                });
                return response.data;
            } catch (error) {
                throw new Error("Atenção: Não foi possível conectar-se à URL informada.");
            }
        } else {
            throw new Error("Atenção: Você precisa definir o token de autenticação.");
        }
    }

    /**
     * Converte os indicadores no tipo do formato aceito pelo webservice.
     * @param tipoDeDados 
     * @param dados 
     */
    async serializar(tipoDeDados: number, dados: any) {
        if (tipoDeDados == TipoDeDados.JSON) {
            try {
                const json = JSON.stringify(dados);
                return json;
            } catch (error) {
                throw new Error("Atenção: Não foi possível serializar os dados para o formato JSON.");
            }
        } else {
            throw new Error("O formato XML ainda não foi implementado.");
        }
    }

    /**
     * Método responsável por validar se o valor informado é branco ou nulo.
     * @param valor 
     */
    static isBlankOrNull(valor: string | null) {
        return valor == null || valor.trim() === '';
    }

    /**
     * Método responsável por validar se o valor informado é uma data no formato indicado.
     * @param date 
     * @param format 
     */
    static validateDate(date: string, format: string = 'd/m/Y H:i:s') {
        const d = new Date(date);
        return !isNaN(d.getTime()) && d.toISOString().slice(0, 19) === date;
    }

    /**
     * Método utilizado para validar o Mês de Referência informado no construtor da classe Integra.
     * @param data 
     */
    static validateDataReferencia(data: string) {
        if (/^(0[1-9]|1[0-2])\d{4}$/.test(data)) {
            return data;
        } else {
            throw new Error("Atenção: A data informada não é válida. Informe no formato \"MMAAAA\".");
        }
    }
}

export {
    /**
     * Inicializa uma nova instância da classe com o token de autenticação do Usuário do SMART.
     * @param token_autenticacao
     */
    TipoDeDados,
    EstabelecimentoSaude
};

