package com.plugin.createDocs.createXML;

import java.io.File;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.util.List;

import org.w3c.dom.Attr;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import com.plugin.tools.xml.MakeArrayList;

public class CreateXML {
    public static void main(String[] args) {
        try {
            MakeArrayList makeArrayList = new MakeArrayList();

            String nameFile = args[0];
            File xmlDir = new File("xml");
            if(!xmlDir.exists()) xmlDir.mkdirs();
            File xmlFile = new File(xmlDir, nameFile + ".xml");

            List<String> attrNamesColumnsList = makeArrayList.makeList(args[1]);
            List<String> attrValuesColumnsList = makeArrayList.makeList(args[2]);
            List<String> tagValuesColumnsList = makeArrayList.makeList(args[3]);

            List<String> attrNamesInfosList = makeArrayList.makeList(args[4]);
            List<String> tagValuesInfosList = makeArrayList.makeList(args[5]);

            String rootElementName = "wish-list";

            DocumentBuilderFactory docBuilderFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder docBuilder = docBuilderFactory.newDocumentBuilder();
            Document doc;

            if(xmlFile.exists()) {
                // carrega o documento existente
                doc = docBuilder.parse(xmlFile);
                doc.getDocumentElement().normalize();

                Element items = (Element) doc.getElementsByTagName("items").item(0);

                Element columns = doc.createElement("columns");
                items.appendChild(columns);

                // adicionar novas colunas ao documento existente
                for(int i = 0; i < attrNamesColumnsList.size(); i++) {
                    Element column = doc.createElement("column");
                    Attr attrName = doc.createAttribute(attrNamesColumnsList.get(i));
                    attrName.setValue(attrValuesColumnsList.get(i));
                    column.setAttributeNode(attrName);
                    column.appendChild(doc.createTextNode(tagValuesColumnsList.get(i)));
                    columns.appendChild(column);
                }

                System.out.println("XML atualizado com sucesso!");
            } else {
                // criar um novo documento
                doc = docBuilder.newDocument();

                // cria atributos para adicionar ao root
                Attr xmlns = doc.createAttribute("xmlns:xsi");
                xmlns.setValue("http://www.w3.org/2001/XMLSchema-instance");
                Attr xsi = doc.createAttribute("xsi:noNamespaceSchemaLocation");
                xsi.setValue("model.xsd");

                // adicionando o root
                Element root = doc.createElement(rootElementName);
                doc.appendChild(root);
                root.setAttributeNode(xmlns);
                root.setAttributeNode(xsi);

                // criando o elemento de items
                Element items = doc.createElement("items");
                root.appendChild(items);

                Element columns = doc.createElement("columns");
                items.appendChild(columns);

                // loop para adicionar colunas
                for(int i = 0; i < attrNamesColumnsList.size(); i++) {
                    Element column = doc.createElement("column");
                    Attr attrName = doc.createAttribute(attrNamesColumnsList.get(i));
                    attrName.setValue(attrValuesColumnsList.get(i));
                    column.setAttributeNode(attrName);
                    column.appendChild(doc.createTextNode(tagValuesColumnsList.get(i)));
                    columns.appendChild(column);
                }

                // criando o elemento de infos-list
                Element infos_list = doc.createElement("infos-list");
                root.appendChild(infos_list);

                // loop para adicionar infos
                for(int i = 0; i < attrNamesInfosList.size(); i++) {
                    Element info = doc.createElement("info");
                    Attr attrInfo = doc.createAttribute(attrNamesInfosList.get(i));
                    attrInfo.setValue(""); // Atribuindo um valor padrão vazio
                    info.setAttributeNode(attrInfo);
                    info.appendChild(doc.createTextNode(tagValuesInfosList.get(i)));
                    infos_list.appendChild(info);
                }
                System.out.println("XML criado com sucesso!");
            }

            // configuração do Transformer para salvar o documento em um arquivo
            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();

            // streamResult para salvar o documento no arquivo
            DOMSource source = new DOMSource(doc);
            StreamResult result = new StreamResult(xmlFile);

            // salvando o documento
            transformer.transform(source, result);
        } catch(Exception exception) {
            exception.printStackTrace();
        }
    }
}