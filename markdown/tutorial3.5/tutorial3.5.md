# **Visualização de Dados**

## **Conexão com o Apache Hive**
- Configure uma conexão no **Superset** para acessar as tabelas Hive:
  - URL de conexão: `hive://<host>:<port>/<database>`

## **Superset: Geração de Gráficos**
1. **Passo 1:** Crie um dataset com base na tabela `silver_produtos`.
2. **Passo 2:** Escolha o tipo de gráfico (barras, linhas, etc.).
3. **Exemplo de Gráfico:** 
   - **Eixo X:** Categoria.
   - **Eixo Y:** Soma do Preço.

## **Superset: Criação de Dashboards**
- Combine gráficos em um layout interativo.
- Exemplo de dashboard:
  - Gráfico de vendas por categoria.
  - Gráfico de estoque por produto.