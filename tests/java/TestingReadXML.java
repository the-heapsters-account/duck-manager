public class TestingReadXML {
    public static void main(String args[]) {
        ReadXML readXML = new ReadXML("../xml/settings.xml");

        String settings = readXML.getTextContentByTagName("settings");
        String quantidadeMinima = readXML.getTextContentByTagName("quantidadeMinima");
        String pathImageCopied = readXML.getTextContentByTagName("pathImageCopied");
        String atalhos = readXML.getTextContentByTagName("atalhos");
        String atalhosNaoPodem = readXML.getTextContentByTagName("atalhosNaoPodem");
        String exemplo = readXML.getTextContentByTagName("exemplo");
        String outroExemplo = readXML.getTextContentByTagName("outroExemplo");

        System.out.println("settings: " + settings);
        System.out.println("quantidade mínima: " + quantidadeMinima);
        System.out.println("path image copied: " + pathImageCopied);
        System.out.println("atalhos: " + atalhos);
        System.out.println("atalhos que não podem: " + atalhosNaoPodem);
        System.out.println("exemplo: " + exemplo);
        System.out.println("outro exemplo: " +outroExemplo);
    }
}