import java.io.File;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

public class Main {
    public static void main(String[] args) {
        try {
            File file = new File("../../xml/settings.xml");

            // Parser do xml
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            DocumentBuilder db = dbf.newDocumentBuilder();
            Document document = db.parse(file);
            //normalização do documento
            document.getDocumentElement().normalize();

            // Lendo quantidade mínima
            NodeList quantidadeMinimaList = document.getElementsByTagName("quantidadeMinima");
            if(quantidadeMinimaList.getLength() > 0) {
                String quantidadeMinima = quantidadeMinimaList.item(0).getTextContent();
                System.out.println("Quantidade mínima: " + quantidadeMinima);
            } else {
                System.out.println("Tag 'quantidadeMinima' não encontrada.");
            }

            // Lendo caminho da imagem copiada
            NodeList pathImageCopiedList = document.getElementsByTagName("pathImageCopied");
            if (pathImageCopiedList.getLength() > 0) {
                String pathImageCopied = pathImageCopiedList.item(0).getTextContent();
                System.out.println("Caminho da imagem copiada: " + pathImageCopied);
            } else {
                System.out.println("Tag 'pathImageCopied' não encontrada.");
            }

            // Lendo atalhos
            NodeList atalhosList = document.getElementsByTagName("atalhos");
            if (atalhosList.getLength() > 0) {
                Element atalhos = (Element) atalhosList.item(0);
                //lendo atalho de 'pesquisa'
                NodeList pesquisaList = atalhos.getElementsByTagName("pesquisa");
                if (pesquisaList.getLength() > 0) {
                    String pesquisa = pesquisaList.item(0).getTextContent();
                    System.out.println("Atalhos:");
                    System.out.println("    Pesquisa: " + pesquisa);
                } else {
                    System.out.println("Tag 'pesquisa' não encontrada.");
                }

                //atalho de menu
                NodeList menuList = atalhos.getElementsByTagName("menu");
                if (menuList.getLength() > 0) {
                    String menu = menuList.item(0).getTextContent();
                    System.out.println("    Menu: " + menu);
                } else {
                    System.out.println("Tag 'menu' não encontrada.");
                }
            }

            // Lendo atalhos que não podem(exemplos)
            NodeList atalhosNaoPodemList = document.getElementsByTagName("atalhosNaoPodem");
            if (atalhosNaoPodemList.getLength() > 0) {
                Element atalhosNaoPodem = (Element) atalhosNaoPodemList.item(0);
                String exemplo = atalhosNaoPodem.getElementsByTagName("exemplo").item(0).getTextContent();
                String outroExemplo = atalhosNaoPodem.getElementsByTagName("outroExemplo").item(0).getTextContent();

                System.out.println("Atalhos que não podem:");
                System.out.println("    Exemplo: " + exemplo);
                System.out.println("    Outro exemplo: " + outroExemplo);

                // Lendo atalhos definidos
                NodeList atalhosDefinidosList = atalhosNaoPodem.getElementsByTagName("atalhosDefinidos");
                if (atalhosDefinidosList.getLength() > 0) {
                    Element atalhosDefinidos = (Element) atalhosDefinidosList.item(0);
                    String pesquisaAtalho = atalhosDefinidos.getElementsByTagName("pesquisaAtalho").item(0).getTextContent();
                    String menuAtalho = atalhosDefinidos.getElementsByTagName("menuAtalho").item(0).getTextContent();

                    System.out.println("Atalhos definidos:");
                    System.out.println("    Atalho pesquisa: " + pesquisaAtalho);
                    System.out.println("    Atalho menu: " + menuAtalho);
                } else {
                    System.out.println("Tag 'atalhosDefinidos' não encontrada.");
                }
            } else {
                System.out.println("Tag 'atalhosNaoPodem' não encontrada.");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}