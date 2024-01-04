import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import { count } from 'rxjs';
import * as XLSX from 'xlsx-js-style';

interface Provider{
    name: string,
    color: string
}
interface PdfProvide{
    _element: any
    colSpan: number
    content: string
    rowSpan: number
    styles: any
}

const doc = new jsPDF()

export class ExportFiles {
    
    exportToExcel(tag: string, brandNum: number){
        
        const table = document.getElementById(tag)
        
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
        
        let randomColors: Array<Provider> = []
        
        
                for (let i = 0; i < brandNum; i++) {
                    console.log(Math.floor(Math.random()*16777215).toString(16))
                   randomColors.push({
                    name: '' , color:  Math.floor(Math.random()*16777215).toString(16)
                   })
                    
                }
            
            
        
        let counter: number = 0
        setTimeout(()=> {
            for(var i in ws){
                
                
                if (typeof ws[i] != 'object' ) continue;
                let cell = XLSX.utils.decode_cell(i);
                if(cell.c == 3 && cell.r != 0 && counter !=brandNum && !randomColors.find(x => x.name ==ws[i].v))
                {
                    randomColors[counter].name = ws[i].v
                    counter+= 1;
                }

            ws[i].s = {
                // styling for all cells
                font: {
                name: 'arial',
                },
                alignment: {
                vertical: 'center',
                horizontal: 'center',
                wrapText: '1', // any truthy value here
                },
                border: {
                right: {
                    style: 'thin',
                    color: '000000',
                },
                left: {
                    style: 'thin',
                    color: '000000',
                },
                },
            };
    
        
            if (cell.r == 0) {
                // first row
                ws[i].s.border.bottom = {
                // bottom border
                style: 'thin',
                color: '000000',
                };
            }
            console.log(ws[i])
            if(randomColors.some(x=> x.name === ws[i].v)){
                        ws[i].s = { fill: {
                            patternType: 'solid',
                            fgColor: { rgb: randomColors.find(x=> x.name == ws[i].v)?.color },
                            bgColor: { rgb: randomColors.find(x=> x.name == ws[i].v)?.color},
                        }};
                        
                        let help: string = 'E'+i[1]
                        ws[help].s = { fill: {
                            patternType: 'solid',
                            fgColor: { rgb: randomColors.find(x=> x.name == ws[i].v)?.color },
                            bgColor: { rgb:  randomColors.find(x=> x.name == ws[i].v)?.color},
                            }};
                        
                        help ='C'+i[1]
                        
                        ws[help].s = { fill: {
                            patternType: 'solid',
                            fgColor: { rgb: randomColors.find(x=> x.name == ws[i].v)?.color },
                            bgColor: { rgb:  randomColors.find(x=> x.name == ws[i].v)?.color},
                            }};

                        help =  'B'+i[1]

                        ws[help].s = { fill: {
                            patternType: 'solid',
                            fgColor: { rgb: randomColors.find(x=> x.name == ws[i].v)?.color },
                            bgColor: { rgb:  randomColors.find(x=> x.name == ws[i].v)?.color},
                            }};
                        
                        help = 'A'+i[1]
                        ws[help].s = { fill: {
                            patternType: 'solid',
                            fgColor: { rgb: randomColors.find(x=> x.name == ws[i].v)?.color },
                            bgColor: { rgb:  randomColors.find(x=> x.name == ws[i].v)?.color},
                            }};
                    }
                        
                    
                    
                }
                ws['!cols']![5] = {hidden: true}
                ws['!cols']![6] = {hidden: true}
                ws['!cols']![7] = {hidden: true}
            const wb: XLSX.WorkBook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            XLSX.writeFile(wb, 'ScoreSheet.xlsx');
        }, 1000)
    }

    exportPdf(tag: string, brandNum: number){
        let counter: number = 0
        
        
        let randomColors: Array<Provider> = []
        
        
        for (let i = 0; i < brandNum; i++) {
            console.log(Math.floor(Math.random()*16777215).toString(16))
           randomColors.push({
            name: '' , color:  Math.floor(Math.random()*16777215).toString(16)
           })
            
        }
    
        

        autoTable(doc, {
            html: '#'+tag,
            columns: [
                {header: 'Id' , dataKey: 'id'},
                {header: 'Card Number' , dataKey: 'ownerIdCardNumber'},
                {header: 'Last Name' , dataKey: 'ownerLastName'},
                {header: 'Brand' , dataKey: 'brandName'},
                {header: 'Model' , dataKey: 'model'}
            ],
            bodyStyles: {textColor: '#FFFFFF'},
            didParseCell: function (data) {


                const list: Array<PdfProvide> = data.row.raw as Array<PdfProvide>
            
                

                    if (!randomColors.some(x=> x.name == list[3].content) && counter !=brandNum && data.section != 'head') {
                        /* console.log(data.row.raw )  */
                            randomColors[counter].name = list[3].content
                            counter+= 1;
                    }
                    
                   if(data.section != 'head')
                    data.cell.styles.fillColor = '#' + randomColors.find(x=> x.name == list[3].content)?.color
                    
                
              },
        })

        

        doc.save('table.pdf')

    }

}