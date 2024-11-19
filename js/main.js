document.addEventListener("DOMContentLoaded", function () {
    loadTOC();
    loadMarkdownFromURL();
});

function loadTOC() {
    fetch("/routes/routes.json")
        .then(response => response.json())
        .then(data => {
            const toc = document.getElementById("toc");
            toc.innerHTML = "";

            // Obter o parâmetro "file" da URL
            const urlParams = new URLSearchParams(window.location.search);
            const currentFile = urlParams.get("file");

            data.categories.forEach(category => {
                const categoryTitle = document.createElement("h2");
                categoryTitle.textContent = category.title;
                toc.appendChild(categoryTitle);

                category.topics.forEach(topic => {
                    const details = document.createElement("details");
                    const summary = document.createElement("summary");
                    summary.textContent = topic.title;
                    details.appendChild(summary);

                    let hasActiveSubtopic = false; // Flag para verificar se o subtopic está ativo

                    if (topic.subtopics) {
                        const ul = document.createElement("ul");
                        ul.className = "custom-ul";
                        topic.subtopics.forEach(subtopic => {
                            const li = document.createElement("li");
                            li.className = "custom-li";
                            const link = document.createElement("a");
                            link.textContent = subtopic.name;
                            link.href = `tutorial.html?file=${subtopic.file}`;
                            li.appendChild(link);

                            // Verificar se este subtopic está ativo
                            if (subtopic.file === currentFile) {
                                li.classList.add("active"); // Adiciona a classe "active" ao li
                                hasActiveSubtopic = true; // Marca como ativo
                            }

                            ul.appendChild(li);
                        });
                        details.appendChild(ul);
                    } else {
                        const link = document.createElement("a");
                        link.textContent = topic.title;
                        link.href = `tutorial.html?file=${topic.file}`;
                        details.appendChild(link);

                        // Verificar se este tópico está ativo
                        if (topic.file === currentFile) {
                            details.open = true; // Abre o <details>
                        }
                    }

                    // Abre o <details> se um subtopic estiver ativo
                    if (hasActiveSubtopic) {
                        details.open = true;
                    }

                    toc.appendChild(details);
                });
            });
        })
        .catch(error => {
            console.error("Erro ao carregar o sumário:", error);
        });
}

function loadMarkdownFromURL() {
    const params = new URLSearchParams(window.location.search);
    const markdownFile = params.get("file");
    
    if (markdownFile) {
        loadMarkdown(markdownFile);
    } else {
        document.getElementById("markdown-content").innerHTML = "<p>Arquivo Markdown não encontrado.</p>";
    }
}

function loadMarkdown(markdownFile) {
    const markdownContent = document.getElementById("markdown-content");

    // Define o caminho base do diretório do arquivo Markdown
    const markdownDir = `/markdown/${markdownFile.slice(0, -3)}/`;

    fetch(`${markdownDir}${markdownFile}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao carregar o arquivo Markdown.");
            }
            return response.text();
        })
        .then(markdownText => {
            // Ajusta as URLs das imagens no texto Markdown
            const updatedMarkdownText = markdownText.replace(
                /!\[(.*?)\]\(([^)]+)\)/g,
                (match, altText, imageUrl) => {
                    // Se a URL da imagem for relativa, adiciona o caminho base
                    const fullImageUrl = imageUrl.startsWith("http") ? imageUrl : `${markdownDir}${imageUrl}`;
                    return `<img alt="${altText}" src="${fullImageUrl}" />`;
                }
            );

            markdownContent.innerHTML = convertMarkdownToHTML(updatedMarkdownText);
        })
        .catch(error => {
            markdownContent.innerHTML = `<p>${error.message}</p>`;
        });
}

function convertMarkdownToHTML(markdownText) {
    // Processa tabelas
    markdownText = markdownText.replace(
        /\|([^|]+)\|(?:\s*\|[^|]+)+\|/gm, // Detecta linhas de tabela
        (match, headerRow, offset, fullText) => {
            // Encontra início e fim da tabela
            const lines = fullText.split("\n");
            const start = lines.findIndex(line => line.includes(headerRow));
            const end = start + lines.slice(start).findIndex(line => !line.includes("|"));

            const tableLines = lines.slice(start, end + 1);
            return parseTableBlock(tableLines);
        }
    );

    // Processa outros elementos Markdown (manter a lógica original)
    return markdownText
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
        .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
        .replace(/\*(.*)\*/gim, '<i>$1</i>')
        .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
        .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
        .replace(/^\s*-\s+(.*)/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)(?!\s*<li>)/g, '$1</ul>')      
        .replace(/(<li>)/, '<ul>$1')                           
        .replace(/^---$/gm, '')                                
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>') 
        .replace(/`([^`]+)`/g, '<code>$1</code>')              
        .replace(/\n$/gim, '<br />');                          
}

// Função para interpretar uma tabela Markdown em linhas e gerar HTML
function parseTableBlock(lines) {
    const header = lines[0];
    const divider = lines[1];
    const rows = lines.slice(2);

    // Cria cabeçalho
    const headers = header.split("|").slice(1, -1).map(h => `<th>${h.trim()}</th>`).join("");
    const tableHead = `<thead><tr>${headers}</tr></thead>`;

    // Cria linhas de dados
    const tableBody = rows.map(row => {
        const cells = row.split("|").slice(1, -1).map(c => `<td>${c.trim()}</td>`).join("");
        return `<tr>${cells}</tr>`;
    }).join("");

    return `<table>${tableHead}<tbody>${tableBody}</tbody></table>`;
}
