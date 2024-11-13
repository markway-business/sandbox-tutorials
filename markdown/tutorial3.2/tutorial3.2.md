# **Design da Arquitetura Medallion**

## **O que é a Arquitetura Medallion?**
A arquitetura Medallion organiza os dados em três camadas principais, promovendo qualidade e organização:

**Bronze (Raw):** Dados brutos, coletados sem transformação.
**Silver (Refinado):** Dados limpos e processados.
**Gold (Agregado):** Dados prontos para análise e consumo.

## **Funcionamento**
- Cada camada tem uma função específica no pipeline de dados.
- Os dados fluem sequencialmente da camada **Bronze** para a **Gold**, com transformações em cada etapa.
- Essa abordagem melhora a escalabilidade e a governança dos dados.

**Diagrama da Arquitetura:**

- **Bronze:** Recebe arquivos CSV no HDFS.
- **Silver:** Transformação e limpeza usando Apache NiFi.
- **Gold:** Criação de tabelas externas no Apache Hive para análise.