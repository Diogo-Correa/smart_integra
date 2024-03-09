<p align="center">
  <a href="" rel="noopener">
 <img width=500px height=80px style="background-color:#c4c4c4; padding: .5em; border-radius: 1rem;" src="https://smart.telessaude.ufrn.br/static/smart_v3/images/logo.png" alt="Project logo"></a>
</p>

<h3 align="center">Componente Facilitador de Integracao</h3>

---

<p align="center"> Este documento se destina a estabelecer as bases para o intercâmbio de dados de produção produzidos pelos Núcleos de Telessaúde (NT) para com o SMART, além de apresentar a proposta de Conjunto de Dados Mínimo no âmbito do Telessaúde Brasil Redes (PTBR-Redes), serve de base para direcionar o desenvolvimento de nova aplicações no contexto do PTBR-Redes.
    <br> 
</p>

## Contextualizacao

De acordo com Brasil (2018), interoperabilidade é a capacidade que diferentes Sistemas de informação (SI) têm se comunicar, trocando informações entre si de maneira eficaz e eficiente. A complexidade em tornar SI interoperáveis vai além das questões técnicas, envolve um processo contínuo de assegurar que sistemas, procedimentos e cultura de uma organização sejam gerenciados de tal forma que possibilitem a maximização das oportunidades para intercâmbio e reuso de informação (Sayão e Marcondes, 2008). Ainda de acordo com Brasil (2018) e APDSI (2013) atingir a interoperabilidade ampla requer acordos de cooperação em três níveis: técnico, semântico, e de organização. O primeiro está relacionado à interoperabilidade tecnológica, isto é, a capacidade básica de dois ou mais sistemas de se comunicarem para a troca de dados e informações, a segunda, relaciona a definição de conteúdo, no uso de vocabulários controlados, por fim, a última, refere-se a capacidade de cooperação entre organizações, obtida pelo alinhamento de processos.

## Visao Geral dos Elementos de Comunicacao da Interoperabilidade

Segundo APDSI (2013), a adoção de elementos de dados padronizados e uma terminologia comum é, sem dúvida, a chave para facilitar a troca de dados e promover a interoperabilidade entre ambientes heterogêneos. Nesse sentido, o conjunto de dados mínimos padroniza vocabulários ao especificar os identificadores unívocos a serem adotados nos SI dos núcleos.

Para cada modelo de conjunto de dados mínimos, há uma interface de comunicação com os SI dos núcleos utilizando web services. Esta interface é implementada utilizando-se padrão REST. Cada interface de comunicação ou serviço recebe uma URL da qual o SI do núcleo envia os dados de produção via internet e recebe uma mensagem de resposta correspondente.

As mensagens envolvidas no intercâmbio de dados contém uma estrutura com um conjunto de pares de nome-valor conhecidas entre todos os envolvidos na comunicação. A troca de mensagens entre os SIs dos núcleos com o SMART e vice-versa são realizadas utilizando o formato JSON. No Apêndice D são apresentados exemplos de JSON válido para mensagem que se espera receber.

O formato da mensagem de resposta possui, dentre outros, um atributo informando se os dados foram recebidos com sucesso ou falha e outro com uma mensagem de notificação. A fim de facilitar o suporte aos desenvolvedores, todos os tipos de mensagens de erros que podem ocorrer na recepção dos dados estão catalogadas no Apêndice C.

O uso do formato JSON para intercâmbio de dados por si só não resolve a questão relativa a representação dos elementos de comunicação envolvidos na troca de dados, é preciso saber o formato válido da mensagem, quais atributos são esperados e como os valores são representados. Para contornar esses problemas, foram criados esquemas JSON que são uma espécie de contrato, onde todas as partes envolvidas por um contexto de aplicação devem escrever seus documentos seguindo o padrão de estruturação, proporcionando assim, mecanismo para a definição de gramáticas para correção de documentos JSON. O significado dos dados é fornecido através da definição da estrutura, índice e semântica dos documentos JSON. O esquema JSON para cada modelo de dados de teleconsultoria são apresentados no Apêndice B.

### Autenticacao

Para solicitação de acesso ao SMART é necessário enviar um e-mail para coordenação do PTBR-Redes (smart@telessaude.ufrn.br) contendo as seguintes informações:

Nome da Plataforma;
Núcleo de Telessaúde;
O token recebido deve ser enviado no cabeçalho da requisição HTTP de acordo com o seguinte exemplo:

```
Authorization: Token <token_recebido>;
```

### Autorizacao

A autorização é feita através da verificação da tripla Núcleo de Telessaúde, Plataforma de Telessaúde e Atividade Ofertada, dessa forma, o SMART garante que as informações enviadas são, de fato, daquele núcleo.

## Componente Facilitador de Integracao

Para agilizar o processo de integração das plataforma de telessaúde dos núcleos com o SMART, poupando tempo e recurso da equipe técnica de desenvolvimento do núcleo, foi criado um Componente Facilitador de Integração, o qual abstrai os detalhes técnicos de implementação, tornando transparente a forma como os dados são gerados e enviados para o SMART.

O primeiro passo para enviar os dados é fazer uso do Componente Facilitador de Integração, acoplá-lo a plataforma de telessaúde do núcleo na linguagem correspondente e fazer uso de suas funções. Cada Componente possui um "cliente" de teste, explicando como fazer uso das funções e como enviar os dados de teleconsultoria, telediagnóstico, atividades de tele-educação, objetos de aprendizagem, cursos ofertados pela tele-educação, cadastro de profissionais de saúde e atualização de estabelecimento de saúde.

A tabela abaixo possui o link para download do Componente em cada uma das linguagem de programação e também a documentação técnica de cada uma de suas funções.

### Integrador TypeScript

Para fazer o uso do integrador usando a linguagem TypeScript/JavaScript basta seguir os passos a seguir.

```
npm i smart_integra
```

Após a instalação, voce deverá importar e usar a biblioteca como o exemplo:

    const smart = new Integra(process.env.SMART_TOKEN || "");
	const core = new EstabelecimentoSaude("0000000", "022024", "NA");

	core.atualizarEstabelecimentoSaude(
		"0000000", // CNES
		true, // teleconsulta
		true, // teleeducação
		true // telediagnóstico
	);

        const serialize = await smart.serializar(TipoDeDados.JSON, core);
        const response = await smart.enviarDados(TipoDeDados.JSON, "https://smart.telessaude.ufrn.br/api/v2/dados-estabelecimentos-saude/?format=json", serialize);
        return response;

No exemplo estamos informando ao SMART o registro de um Estabelecimento de Saúde. Em caso de dúvidas voce pode acessar a documentação da API [aqui](https://smart.telessaude.ufrn.br/webapp/api_docs/ "aqui").

## ✍️ Authors
- Allyson Barros
- [@diogocorrea](https://github.com/Diogo-Correa) - Integralizador TypeScript
