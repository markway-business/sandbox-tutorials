# **Introdução ao Caso de Uso**

## Descrição do caso de uso
Este caso de uso ilustra a criação de um **pipeline de dados completo utilizando ferramentas como NiFi, Hive, HDFS e Superset**. Ele emprega a arquitetura Medallion, que organiza os dados em três camadas: Bronze, Silver e Gold. Esse modelo é amplamente utilizado por sua capacidade de aprimorar a qualidade e otimização dos dados processados, permitindo manipulações para formatos mais eficientes, como Parquet e JSON.

Os dados brutos, inicialmente armazenados em arquivos CSV, passam por processos de ingestão e tratamento no NiFi. Após a transformação, são disponibilizados no data lake através de tabelas Hive externas, permitindo o consumo em ferramentas de visualização e análise. O Superset, uma plataforma de BI 100% open source, é utilizado para criar dashboards interativos, possibilitando a apresentação clara e informativa das informações processadas.

## Objetivo principal e importância do projeto
O principal objetivo deste caso de uso é explorar as capacidades da sandbox TDP e suas ferramentas integradas, por meio da execução de um pipeline de dados completo. Este projeto fornece uma visão prática e abrangente de um fluxo de dados moderno, essencial para iniciativas como análise de produtos, relatórios e dashboards.

## Recursos Disponíveis
Faça o download dos recursos necessários no link: **[Baixar Recursos](../assets/assets.rar)**


Os arquivos fornecidos incluem:
- **csv:** estrutura de diretórios contendo os arquivos CSV prontos para o caso de uso.
- **hive:** script para criação da tabela externa na camada Gold.
- **nifi:** arquivo XML com os processos configurados no NiFi, prontos para importação.
- **superset:** exportação do dashboard e gráficos criados no Superset, prontos para importação e personalização.  