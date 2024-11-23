# **Introdução ao Caso de Uso**

## Descrição do caso de uso
Este caso de uso ilustra a criação de um **pipeline de dados completo utilizando as ferramentas NiFi, Hive, HDFS e Superset**. Ele emprega a arquitetura Medallion, que organiza os dados em três camadas: Bronze, Silver e Gold. Esse modelo vem sendo adotado por sua capacidade de organização dos dados processados.

Os dados brutos obtidos em formato de arquivos CSV passam por processos de ingestão e tratamento no NiFi. Após a transformação, são disponibilizados no data lake através de tabelas Hive externas, permitindo o consumo em ferramentas de visualização e análise. O Superset foi a ferramenta escolhida pois disponibiliza dashboards interativos, possibilitando a apresentação clara e informativa dos dados processados.

## Objetivo principal e importância do projeto
O principal objetivo deste caso de uso é demonstrar as capacidades do TDP com a execução de um pipeline de dados completo. Este projeto fornece uma visão prática e abrangente de um fluxo de dados moderno, comum a quaisquer iniciativas de análise de produtos, monitoramento de indicadores e dados operacionais.

## Recursos Disponíveis
Faça o download dos recursos necessários no link: **[Baixar Recursos](../assets/assets.rar)**


Os arquivos fornecidos incluem:
- **csv:** estrutura de diretórios contendo os arquivos CSV prontos para o caso de uso.
- **hive:** script para criação da tabela externa na camada Gold.
- **nifi:** arquivo XML com os processos configurados no NiFi, prontos para importação.
- **superset:** exportação do dashboard e gráficos criados no Superset, prontos para importação e personalização.  