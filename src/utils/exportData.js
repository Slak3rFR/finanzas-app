import * as XLSX from 'xlsx'

import jsPDF from 'jspdf'

import autoTable from 'jspdf-autotable'

// EXCEL

export const exportToExcel = (
  data
) => {

  const worksheet =
    XLSX.utils.json_to_sheet(
      data
    )

  const workbook =
    XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    'Finanzas'
  )

  XLSX.writeFile(
    workbook,
    'finanzas.xlsx'
  )

}

// PDF

export const exportToPDF = (
  data
) => {

  const doc =
    new jsPDF()

  doc.setFontSize(18)

  doc.text(
    'Reporte Financiero',
    14,
    20
  )

  autoTable(doc, {

    startY: 30,

    head: [[
      'Fecha',
      'Tipo',
      'Categoria',
      'Descripcion',
      'Monto',
    ]],

    body: data.map(
      (item) => [

        item.date,

        item.type,

        item.category,

        item.description,

        `$${item.amount}`,

      ]
    ),

  })

  doc.save(
    'finanzas.pdf'
  )

}