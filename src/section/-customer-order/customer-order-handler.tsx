import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import styles from './style/customer-order.module.css';
import { LoadingButton } from "@mui/lab";
import { getCustomer } from "../service/customer-service";
import { Customer } from "../model/customer";
import { CustomerOrderParam, PARAMETER_CUSTOMER_ORDER_ID, ROUTE_PATH_CUSTOMER_ORDER_ADD_RISK } from "../../infrastructure/route";
import ViewLoader from "../../component/view-loader/view-loader";
import { CustomerOrder } from "../model/customer-order";
import { CustomerOrderRiskAssessment } from "../model/customer-order-risk-assessment";
import RiskAssessmentsHandler from "./components/risk-assessments-handler";
import CustomerInfoHandler from "./components/customer-info-handler";
import { exportPdf } from "./utils/export-pdf";
import { deleteCustomerOrderRiskAssessment, getCustomerOrder, upsertCustomerOrderRiskAssessment } from "../service/customer-order-service";

export default function CustomerOrderHandler() {
    const params = useParams<keyof CustomerOrderParam>();
    const customerOrderId = params.customerOrderId || "" 

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [customer, setCustomer] = useState<Customer | undefined>();
    const [customerOrder, setCustomerOrder] = useState<CustomerOrder | undefined>();
    const [customerRiskAssessment, setCustomerRiskAssessment] = useState<CustomerOrderRiskAssessment[] | undefined>();
    const [customerRiskAssessmentUpdate, setCustomerRiskAssessmentUpdate] = useState<CustomerOrderRiskAssessment[] | undefined>();
    const [riskCategories, setRiskCategories] = useState<string[]>([]);
    const [editCustomerOrderActive, setEditCustomerOrderActive] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        if (customerOrderId) {
            getCustomerOrder(customerOrderId).then(customerOrder => {
                getCustomer(customerOrder.customerId).then(customer => {
                    setCustomer(customer);
                    setCustomerOrder({...customerOrder});
                    setCustomerRiskAssessment(customerOrder!.riskAssessments);
                    setCustomerRiskAssessmentUpdate(customerOrder!.riskAssessments);
                    setRiskCategories([...new Set(customerOrder.riskAssessments.map(_ => _.riskCategoryName))])
                    setLoading(false);
                })
            });
        }
    }, [customerOrderId]);

    const handleRiskAssessmentClose = () => {
        setCustomerRiskAssessmentUpdate([...customerRiskAssessment!]);
    }

    const handleRiskAssessmentUpdate = (riskAssessment: CustomerOrderRiskAssessment) => {
        const riskAssessmentsUpdate = [...customerRiskAssessmentUpdate!];
        const index = riskAssessmentsUpdate.findIndex(_ => _.id === riskAssessment.id);
        riskAssessmentsUpdate[index] = riskAssessment;
        setCustomerRiskAssessmentUpdate(riskAssessmentsUpdate);
    }

    const handleRiskAssessmentSave = (riskAssessment: CustomerOrderRiskAssessment) => {
        if((riskAssessment.chance! > 0 && riskAssessment.impact! > 0) || riskAssessment.isSkipped === true) {
            setUpdating(true);
            upsertCustomerOrderRiskAssessment(customerOrderId, riskAssessment).then((riskAssessmentUpdate) => {
                const riskAssessmentsUpdate = [...customerRiskAssessment!];
                const index = riskAssessmentsUpdate.findIndex(_ => _.id === riskAssessmentUpdate.id);
                riskAssessmentsUpdate[index] = riskAssessment;
                setCustomerRiskAssessment(riskAssessmentsUpdate);
                setCustomerRiskAssessmentUpdate(riskAssessmentsUpdate);
                setUpdating(false);
            });
        }
    }

    const handleRiskAssessmentDelete = (riskAssessmentId: string) => {
        setUpdating(true);
        deleteCustomerOrderRiskAssessment(customerOrderId, riskAssessmentId).then(() => {
            const riskAssessmentsUpdate = [...customerRiskAssessment!].filter(_ => _.id !== riskAssessmentId);
            setCustomerRiskAssessment(riskAssessmentsUpdate);
            setCustomerRiskAssessmentUpdate(riskAssessmentsUpdate);
            setRiskCategories([...new Set(riskAssessmentsUpdate.map(_ => _.riskCategoryName))]);
            setUpdating(false);
        });
    }

    return (
        <>
            <ViewLoader loading={loading} />
            {loading === false && <div className={styles.accordion}>
                <h2>{customerOrder?.constructionProjectTitle}</h2>

                <div>
                    <CustomerInfoHandler 
                        customer={customer}
                        customerOrder={customerOrder}
                        setCustomerOrder={setCustomerOrder}
                        editCustomerOrderActive={editCustomerOrderActive}
                        setEditCustomerOrderActive={setEditCustomerOrderActive}
                    />

                    {editCustomerOrderActive === false && <div className={styles.buttonWrapper}>
                        <div>
                            <LoadingButton
                                sx={{marginTop: '0.5rem', marginBottom: '0.5rem'}}
                                className={styles.button}
                                variant="contained"
                                onClick={() => setEditCustomerOrderActive(true)}
                            >
                                Ändra projektbeskrivning
                            </LoadingButton>
                        </div>
                        <div>
                            <LoadingButton
                                sx={{marginTop: '0.5rem', marginBottom: '0.5rem'}}
                                className={styles.button}
                                variant="contained"
                                onClick={() => navigate(ROUTE_PATH_CUSTOMER_ORDER_ADD_RISK
                                    .replace(PARAMETER_CUSTOMER_ORDER_ID, customerOrderId))}
                            >
                                Lägg till egen risk
                            </LoadingButton>
                        </div>
                        <div>
                            <LoadingButton
                                endIcon={<PictureAsPdfIcon />}
                                sx={{marginTop: '0.5rem', marginBottom: '0.5rem'}}
                                className={styles.button}
                                variant="contained"
                                onClick={() => exportPdf(customer, customerOrder)}
                            >
                                Ladda ner
                            </LoadingButton>
                        </div>
                    </div>}
                </div>
                
                <RiskAssessmentsHandler 
                    riskCategories={riskCategories}
                    riskAssessments={customerRiskAssessmentUpdate!}
                    loading={updating}
                    onRiskAssessmentClose={handleRiskAssessmentClose}
                    onRiskAssessmentUpdate={handleRiskAssessmentUpdate}
                    onRiskAssessmentSave={handleRiskAssessmentSave}
                    onRiskAssessmentDelete={handleRiskAssessmentDelete}
                />
            </div>}
        </>
    );
}