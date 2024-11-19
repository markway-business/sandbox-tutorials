# **Coleta e Ingestão de Dados**

## **Arquivo CSV de Produto**
- Exemplo: Um arquivo CSV com informações sobre produtos.
- Estrutura do arquivo:
  ```
  ProdutoID, Nome, Categoria, Preço, Estoque
  1, Caneta, Papelaria, 1.5, 100
  ```

## **Configuração no Apache NiFi**
- **Passo 1:** Configure um processador *GetFile* para monitorar o diretório onde o CSV é armazenado.
- **Passo 2:** Use um processador *PutHDFS* para salvar os dados na camada **Bronze** do HDFS.
- **Fluxo:**
  ```
  GetFile -> PutHDFS
  ```