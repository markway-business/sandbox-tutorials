# **Orquestração de Dados na Camada Bronze com NiFi e HDFS (parte 2)**

## Processed to Bronze Layer
Neste tópico, configuraremos um fluxo no NiFi para mover os dados do diretório `processed` para a camada bronze no HDFS sem alterar a estrutura original dos dados. A camada Bronze é onde os dados são armazenados de forma bruta e sem modificações, exatamente como foram ingeridos. O objetivo é garantir que os dados sejam preservados em sua forma original, permitindo que possam ser auditados ou manipulados em estágios posteriores do pipeline de dados.

### Processos do Nifi
Utilizaremos os seguintes processadores no Nifi:

```
GetFile -> UpdateAttribute -> PutHDFS
```

    ![Processos NiFi](image1.png)

**GetFile**: recupera o arquivo `Product.csv` do diretório `processed`.
| Configuração | Campo            | Valor                          | Descrição                                               |
|------------------|----------------------|------------------------------------|-------------------------------------------------------------|
| Scheduling   | Run Schedule         | `86400 sec`                          | Equivalente a 1 dia em segundos                             |
| Properties   | Input Directory      | `/home/data/edge/processed`         | Diretório de entrada para os arquivos                      |
|                  | File Filter          | `.*\.csv$`                         | Recupera todos os arquivos com extensão `.csv`             |
|                  | Keep Source File     | `true`                            | Mantém os arquivos de `processed` após mover para o HDFS   |
| Relationships| success              | `retry`                               | Conexão para fluxo em caso de sucesso                      |


**UpdateAttribute**: cria o path do diretório em `processed`.
| Configuração | Campo              | Valor                                      | Descrição                                             |
|------------------|------------------------|----------------------------------------------|-----------------------------------------------------------|
| Properties   | relativePath         | `${absolute.path:substringAfter('data/edge/processed/')}` | Cria a propriedade `relativePath` com base no caminho absoluto |
| Relationships| success              | -                                            | Fluxo em caso de sucesso                                  |


**PutFile**: Salva o arquivo no diretório `processed`.
| Configuração | Campo                     | Valor                                         | Descrição                                             |
|------------------|-------------------------------|-------------------------------------------------|-----------------------------------------------------------|
| Properties   | Hadoop Configuration Resources                  | `/etc/hadoop/conf/core-site.xml,/etc/hadoop/conf/hdfs-site.xml` | Caminho para os arquivos de configuração do Hadoop necessários para acessar o HDFS                   |
|                  | Directory | `/bronze/${relativePath}`                                       | 	Diretório de destino na camada Bronze, baseado no caminho relativo       |
|                  | Conflict resolution Strategy | `replace`                                          | Substitui arquivos existentes em caso de conflito             |
|                  | Writing Strategy | `Write and rename`                                          | Escreve o arquivo temporariamente e renomeia ao final para evitar corrupção             |
| Relationships| success                    | `terminate`                                     | Finaliza o fluxo em caso de sucesso                      |
|                  | failure                    | `terminate`                                     | Finaliza o fluxo em caso de falha                        |

 
Com essas etapas, a camada Bronze estará devidamente configurada, pronta para futuras transformações e processamento. A próxima seção abordará como transformar os dados da Bronze para a camada Silver.  