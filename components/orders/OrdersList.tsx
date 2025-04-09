// ------------ Components ----------------
import { Order } from './index'
import { Loading, NoContent, Error } from '../ui';
// ------------ Types ----------------
import { TOrdersList } from '@/types';

const OrdersList = ({orders, loading, error}: TOrdersList) => {
    return (
        <div className='flex flex-col items-center justify-center'>
            
            {loading ? 
                <Loading />
             : error ? 
                <Error error={error} />
             : orders && orders.length > 0  ? 
                orders.map(order => (
                    <Order 
                        key={order?.id} 
                        totalPrice={order?.totalPrice}
                        date={order?.date}
                        courses={order?.courses}
                    />
                ))
             : 
                <NoContent text='No Orders Yet'/>
            }
        </div>
    );
}

export default OrdersList;