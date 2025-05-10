import SaveIcon from '@mui/icons-material/Save';
import { useState } from "react";
import { CustomerOrderUpdate } from "../../model/customer-order-update";
import { customerOrderUpdateFieldDefinitions } from "../field-description/customer-order-update-field-definition";
import BaseForm from "../../../component/form/base-form";
import { Customer } from "../../model/customer";
import { CustomerOrder } from "../../model/customer-order";
import { updateCustomerOrder } from '../../service/customer-order-service';

export default function CustomerInfoHandler({
    customer,
    customerOrder,
    setCustomerOrder,
    editCustomerOrderActive,
    setEditCustomerOrderActive
}: {
    customer?: Customer | undefined,
    customerOrder?: CustomerOrder | undefined
    setCustomerOrder: React.Dispatch<React.SetStateAction<CustomerOrder | undefined>>,
    editCustomerOrderActive: boolean
    setEditCustomerOrderActive: React.Dispatch<React.SetStateAction<boolean>>,
}) {
    const [customerOrderUpdate, setCustomerOrderUpdate] = useState<CustomerOrderUpdate>(
        {id: customerOrder?.id, customerProjectDescription: customerOrder?.customerProjectDescription});
    const [updating, setUpdating] = useState(false);

    const handleUpdateCustomerOrder = () => {
        setUpdating(true);
        updateCustomerOrder(customerOrderUpdate).then((result) => {
            setCustomerOrder(result);
            setCustomerOrderUpdate({id: result.id, customerProjectDescription: result.customerProjectDescription});
            setUpdating(false);
            setEditCustomerOrderActive(false);
        })
    }

    const handleCancleUpdateCustomerOrder = () => {
        setCustomerOrderUpdate({id: customerOrder?.id, customerProjectDescription: customerOrder?.customerProjectDescription});
        setEditCustomerOrderActive(false);
    }

    return (     
        <>
            <p>
                {customer?.firstName} {customer?.lastName}<br />
                {customer?.street}<br />
                {customer?.postalCode} {customer?.city}
            </p>
            <p>
                {customer?.phoneNumber}<br />
                {customer?.emailAddress}
            </p>
            <h3 onClick={() => setEditCustomerOrderActive(true)}>Ditt projekt</h3>
            {editCustomerOrderActive === false && <p>
                {customerOrder?.customerProjectDescription}
            </p>}
            {editCustomerOrderActive === true && <BaseForm 
                model={customerOrderUpdate}
                fields={customerOrderUpdateFieldDefinitions}
                setModel={setCustomerOrderUpdate}

                submitButtonText="Spara"
                submitIcon={<SaveIcon />}
                onSubmitButtonClick={handleUpdateCustomerOrder}
                submitting={updating}
            
                cancelButtonText="Avbryt"
                onCancelButtonClick={handleCancleUpdateCustomerOrder}
            />}
        </>
    );
}