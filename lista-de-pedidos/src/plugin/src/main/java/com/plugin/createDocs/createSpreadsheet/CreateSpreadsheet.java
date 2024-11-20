package com.plugin.createDocs.createSpreadsheet;

import java.util.List;
import java.util.ArrayList;

import com.plugin.tools.readDoc.ReadText;
import com.plugin.tools.xml.MakeArrayList;

public class CreateSpreadsheet {
    public static void main(String[] args) {
        ReadText readText = new ReadText();
        List<String> lines = readText.getLines();

        MakeArrayList makeArrayList = new MakeArrayList();

        List<List<String>> linesList = new ArrayList<>();

        for(String line : lines) {
            if(!line.trim().isEmpty()) {
                System.out.println(line);
                List<String> list = makeArrayList.makeList(line);
                linesList.add(list);
            }
        }

        for(List<String> lineList : linesList) {
            System.out.println("itens da lista \"" + lineList + "\"");
            for(int i = 0; i < lineList.size(); i++) System.out.println(lineList.get(i));
        }
    }
}