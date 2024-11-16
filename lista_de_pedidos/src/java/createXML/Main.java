import org.w3c.dom.Document;
import org.w3c.dom.Element;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {
        // lista de produtos - 'fantasia' - depois tem que alterar a fonte dos produtos
        List<Produto> produtos = new ArrayList<>();
        produtos.add(new Produto("001", "REFERENCIA01", "785448784", "cadeira de rodas", "599.99", "9"));
        produtos.add(new Produto("002", "REFERENCIA02", "1684618984", "par de muletas", "150.00", "10"));

        // verificação da lista de produtos
        if(produtos == null || produtos.isEmpty()) {
            System.out.println("A lista de produtos está vazia ou é null!");
            return;  // se a çista estiver vazia encerra ela

        // gera o XML com o método
        gerarXML(produtos);
    }

    public static void gerarXML(List<Produto> produtos) {
        try {
            // Criando o DocumentBuilder
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document doc = builder.newDocument();

            // Raiz do XML
            Element raiz = doc.createElement("columns");
            doc.appendChild(raiz);

            // Adicionando produtos
            for(Produto p : produtos) {

                // vendo atributo ou produto nulo
                if(p == null) {
                    System.out.println("Produto nulo localizado!");
                    continue;
                }

                if(p.getCodigo() == null || p.getNome() == null || p.getReferencia() == null || p.getCodigoBarras()== null || p.getPreco() == null || p.getQuantidade() == null) {
                    System.out.println("Valor 'nulo' encontrado em algum campo" + p);
                    continue;
                }

                // criação do <column-description>
                Element colDesc = doc.createElement("column-description");

                // criando elements description
                Element descricaoCodigo = doc.createElement("description");
                descricaoCodigo.setAttribute("codigo", "código");
                descricaoCodigo.appendChild(doc.createTextNode(p.getCodigo()));
                colDesc.appendChild(descricaoCodigo);

                Element descricaoReferencia = doc.createElement("description");
                descricaoReferencia.setAttribute("referencia", "referência");
                descricaoReferencia.appendChild(doc.createTextNode(p.getReferencia()));
                colDesc.appendChild(descricaoReferencia);

                Element descricaoCodigoBarras = doc.createElement("description");
                descricaoCodigoBarras.setAttribute("codigo_barras", "código de barras");
                descricaoCodigoBarras.appendChild(doc.createTextNode(p.getCodigoBarras()));
                colDesc.appendChild(descricaoCodigoBarras);

                Element descricaoNome = doc.createElement("description");
                descricaoNome.setAttribute("nome", "nome");
                descricaoNome.appendChild(doc.createTextNode(p.getNome()));
                colDesc.appendChild(descricaoNome);

                Element descricaoPreco = doc.createElement("description");
                descricaoPreco.setAttribute("preco", "preco_venda");
                descricaoPreco.appendChild(doc.createTextNode(p.getPreco()));
                colDesc.appendChild(descricaoPreco);

                Element descricaoQuantidade = doc.createElement("description");
                descricaoQuantidade.setAttribute("quantidade", "estoque");
                descricaoQuantidade.appendChild(doc.createTextNode(p.getQuantidade()));
                colDesc.appendChild(descricaoQuantidade);
                // adicionando o produto no XML
                raiz.appendChild(colDesc);
            }

            // criando o arquivo XML no diretório
            File file = new File("file_destiny_temporary.xml");
            file.getParentFile().mkdirs();

            // transformer para o print
            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();
            transformer.setOutputProperty(OutputKeys.INDENT, "yes");

            // print do xml no terminal(1)
            DOMSource source = new DOMSource(doc);
            StreamResult result = new StreamResult(System.out);
            transformer.transform(source, result);

            // salvando o arquivo(2)
            StreamResult fileResult = new StreamResult(file);
            transformer.transform(source, fileResult);

            System.out.println("\nXML criado com sucesso em: " + file.getAbsolutePath());

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Classe Produto de referencia
    static class Produto {
        private String codigo, referencia, codigoBarras, nome, preco, quantidade;

        public Produto(String codigo, String referencia, String codigoBarras, String nome, String preco, String quantidade) {
            if(codigo == null || referencia == null || codigoBarras == null || nome == null || preco == null || quantidade == null) {
                throw new IllegalArgumentException("Todos os parâmetros devem ser não nulos");
            }
            this.codigo = codigo;
            this.referencia = referencia;
            this.codigoBarras = codigoBarras;
            this.nome = nome;
            this.preco = preco;
            this.quantidade = quantidade;
        }

        public String getCodigo() { return codigo; }
        public String getReferencia() { return referencia; }
        public String getCodigoBarras() { return codigoBarras; }
        public String getNome() { return nome; }
        public String getPreco() { return preco; }
        public String getQuantidade() { return quantidade; }
    }
}
