# **Transformação de Dados**

## **Uso do Apache NiFi**
- Crie um fluxo para processar os dados do HDFS.
- **Exemplo de Processadores:**
  - *GetHDFS* para leitura dos dados da camada Bronze.
  - *ReplaceText* para padronizar colunas ou corrigir erros.
  - *PutHDFS* para salvar os dados na camada **Silver**.

## **Dados Salvos no HDFS**
- Estrutura organizada por camadas:
  ```
  /data/bronze/produtos.csv
  /data/silver/produtos_limpos.csv
  ```

## **Criação de Tabelas Externas no Hive**
1. **Tabela Bronze:**
   ```sql
   CREATE EXTERNAL TABLE bronze_produtos (
       ProdutoID INT,
       Nome STRING,
       Categoria STRING,
       Preço FLOAT,
       Estoque INT
   )
   STORED AS TEXTFILE
   LOCATION '/data/bronze/';
   ```

2. **Tabela Silver:**
   ```sql
   CREATE EXTERNAL TABLE silver_produtos (
       ProdutoID INT,
       Nome STRING,
       Categoria STRING,
       Preço FLOAT,
       Estoque INT
   )
   STORED AS TEXTFILE
   LOCATION '/data/silver/';
   ```