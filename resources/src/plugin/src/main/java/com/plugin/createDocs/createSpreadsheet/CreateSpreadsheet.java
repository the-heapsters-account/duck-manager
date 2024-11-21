package com.plugin.createDocs.createSpreadsheet;

import java.util.List;
import java.util.ArrayList;
import java.io.FileOutputStream;
import java.io.IOException;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.plugin.tools.readDoc.ReadText;
import com.plugin.tools.xml.MakeArrayList;

public class CreateSpreadsheet {
    public static void main(String[] args) {
        String fileName = args[0];
        ReadText readText = new ReadText();
        List<String> lines = readText.getLines();

        MakeArrayList makeArrayList = new MakeArrayList();

        List<List<String>> linesList = new ArrayList<>();

        for(String line : lines) {
            if(!line.trim().isEmpty()) {
                List<String> list = makeArrayList.makeList(line);
                linesList.add(list);
            }
        }

        // Print lists for debugging purposes
        for(int i = 0; i < linesList.size(); i++) {
            System.out.println("list: " + linesList.get(i) + " | index: " + i);
        }

        // Listas de informações de nomes e valores
        List<String> listInfosNames = linesList.get(linesList.size() - 2); // penúltima linha
        List<String> listInfosValues = linesList.get(linesList.size() - 1); // última linha

        // Remover as duas últimas linhas da lista original
        linesList.remove(linesList.size() - 1);
        linesList.remove(linesList.size() - 1);

        // Criar a planilha
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Pedidos");

        // Criar estilos
        CellStyle titleStyle = workbook.createCellStyle();
        Font titleFont = workbook.createFont();
        titleFont.setFontHeightInPoints((short) 16);
        titleFont.setBold(true);
        titleStyle.setFont(titleFont);
        titleStyle.setAlignment(HorizontalAlignment.CENTER);
        titleStyle.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
        titleStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        CellStyle headerStyle = workbook.createCellStyle();
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerStyle.setFont(headerFont);
        headerStyle.setFillForegroundColor(IndexedColors.LIGHT_CORNFLOWER_BLUE.getIndex());
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        CellStyle infoTitleStyle = workbook.createCellStyle();
        Font infoTitleFont = workbook.createFont();
        infoTitleFont.setBold(true);
        infoTitleStyle.setFont(infoTitleFont);
        infoTitleStyle.setFillForegroundColor(IndexedColors.LIGHT_YELLOW.getIndex());
        infoTitleStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        CellStyle infoValueStyle = workbook.createCellStyle();
        Font infoValueFont = workbook.createFont();
        infoValueStyle.setFont(infoValueFont);
        infoValueStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
        infoValueStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        CellStyle dataStyle = workbook.createCellStyle();
        Font dataFont = workbook.createFont();
        dataStyle.setFont(dataFont);
        dataStyle.setFillForegroundColor(IndexedColors.LIGHT_ORANGE.getIndex());
        dataStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        // Criar a primeira linha com o título
        Row titleRow = sheet.createRow(0);
        Cell titleCell = titleRow.createCell(0);
        titleCell.setCellValue("Lista de Pedidos");
        titleCell.setCellStyle(titleStyle);
        sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 7));

        // Adicionar informações gerais
        int infoRowNum = 1;
        for(int i = 0; i < listInfosNames.size(); i++) {
            Row infoRow = sheet.createRow(infoRowNum++);
            Cell titleCellInfo = infoRow.createCell(0);
            titleCellInfo.setCellValue(listInfosNames.get(i));
            titleCellInfo.setCellStyle(infoTitleStyle);

            Cell valueCell = infoRow.createCell(1);
            valueCell.setCellValue(listInfosValues.get(i));
            valueCell.setCellStyle(infoValueStyle);
        }

        // Adicionar títulos das colunas dos produtos na última linha
        int headerRowNum = sheet.getLastRowNum() + 1;
        Row headerRow = sheet.createRow(headerRowNum);
        List<String> productHeaders = linesList.get(linesList.size() - 1);
        for(int i = 0; i < productHeaders.size(); i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(productHeaders.get(i));
            cell.setCellStyle(headerStyle);
        }

        linesList.remove(linesList.size() - 1);

        // Adiciona os itens das colunas dos produtos na última linha
        for(int i = 0; i < linesList.size(); i++) {
            int productRowNum = sheet.getLastRowNum() + 1;
            Row productRow = sheet.createRow(productRowNum);
            List<String> productColumn = linesList.get(i);

            for(int j = 0; j < productColumn.size(); j++) {
                Cell cell = productRow.createCell(j);
                cell.setCellValue(productColumn.get(j));
                cell.setCellStyle(dataStyle);
            }
        }

        // Ajustar largura das colunas
        for(int i = 0; i < productHeaders.size(); i++) {
            sheet.autoSizeColumn(i);
        }

        try (FileOutputStream fileOut = new FileOutputStream("spreadsheets/" + fileName + ".xls")) {
            workbook.write(fileOut);
        } catch(IOException e) {
            e.printStackTrace();
        }

        try {
            workbook.close();
        } catch(IOException e) {
            e.printStackTrace();
        }

        System.out.println("deu tudo ok");
    }
}