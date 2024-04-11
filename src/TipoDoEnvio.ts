/**
 * Classe responsável por armazenar as constantes dos tipos de envio aceitos pelos serviços do webservice.
 * 
 * NA - Novo/Atualização (Incrementa ou atualiza os dados existentes)
 * RE - Reprocessamento (Apaga TODOS os dados da competência e insere os novos)	
 * 
 * Observação: O SMART assume o valor padrão para Reprocessamento (RE).
 */
export class TipoDoEnvio {
    static NOVO_ATUALIZACAO: string = 'NA'; // TipoDoEnvio.NOVO_ATUALIZACAO
    static REPROCESSAMENTO: string = 'RE';  // TipoDoEnvio.REPROCESSAMENTO
}