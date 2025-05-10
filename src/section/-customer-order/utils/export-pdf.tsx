import { Template } from "@pdfme/common";
import { riskAssessmentTemplate } from "../pdf-template/risk-assessments";
import { CustomerOrder } from "../../model/customer-order";
import { Customer } from "../../model/customer";
import { generate } from "@pdfme/generator";
import { image, table, text } from "@pdfme/schemas";

export const exportPdf = (
    customer: Customer | undefined,
    customerOrder: CustomerOrder | undefined
) => {
    const template: Template = riskAssessmentTemplate;
    
    const titlePdf = `Riskbedömning - ${customerOrder?.constructionProjectTitle}`
    const customerPdf = `${customer?.firstName} ${customer?.lastName}\n${customer?.street}\n${customer?.postalCode} ${customer?.postalCode}`;
    const infoPdf = `Ordernummer: ${customerOrder?.id}\nTelefonnummer: ${customer?.phoneNumber}\nE-mail: ${customer?.emailAddress}`
    
    const sortedRiskAssessments = customerOrder?.riskAssessments.sort((ra1, ra2) => {
        if (ra1.chance! * ra1.impact! < ra2.chance! * ra2.impact!) {
            return 1;
        }
        if (ra1.chance! * ra1.impact! > ra2.chance! * ra2.impact!) {
            return -1;
        }
        return 0;
    })
    const riskAssessmentsPdf = sortedRiskAssessments?.map(_ => {
        return [
            `${sortedRiskAssessments.findIndex(sra => sra.id === _.id) + 1}`,
            _.riskTitle,
            `${_.chance !== undefined && _.chance > 0 ? _.chance : "-"}`,
            `${_.impact !== undefined && _.impact > 0 ? _.impact : "-"}`,
            `${_.chance !== undefined && _.impact !== undefined && _.chance * _.impact > 0 ? _.chance * _.impact : "-"}`,
        ]
    })

    const inputs = [{ 
        title: titlePdf, 
        customer: customerPdf, 
        info: infoPdf, 
        projectDescription: customerOrder?.customerProjectDescription,
        risks: riskAssessmentsPdf }];

    generate({ template, inputs, plugins: { text, image, table } }).then((pdf) => {
        const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
        const fileName: string = `${customerOrder?.constructionProjectTitle}-${customerOrder?.id}.pdf`;
        const objectUrl: string = URL.createObjectURL(blob);
        const pdfLink: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

        pdfLink.href = objectUrl;
        pdfLink.download = fileName;
        document.body.appendChild(pdfLink);
        pdfLink.click();

        document.body.removeChild(pdfLink);
        URL.revokeObjectURL(objectUrl);
    });
}