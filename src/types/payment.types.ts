export interface PesaPalErrorProps {
  error_type: string;
  code: string;
  message: string;
  status: string;
}

export interface RequestTokenProps {
  token: string;
  expiryDate: string;
  error: string | null;
  status: string;
  message: string;
}

export interface RegisterIPNProps {
  error?: PesaPalErrorProps;
  url: string;
  created_date: string;
  ipn_id: string;
  notification_type: number;
  ipn_notification_type_description: string;
  ipn_status: number;
  ipn_status_decription: string;
  status: string;
  message: string;
}

export interface OrderRequestProps {
  order_tracking_id: string;
  merchant_reference: string;
  redirect_url: string;
  status: string;
  error: PesaPalErrorProps | null;
}

export interface PaymentRequestProps {
  id: string;
  currency: string;
  amount: number;
  description: string;
  callback_url: string;
  notification_id: string;
  billing_address: {
    phone_number: string;
  };
}

export type PaymentStatusTypes = {
  payment_method: string;
  amount: number;
  created_date: string;
  confirmation_code: string;
  order_tracking_id: string;
  payment_status_description: string;
  description: string | null;
  message: string;
  payment_account: string;
  status_code: number;
  merchant_reference: string;
  account_number: string | null;
  payment_status_code: string;
  currency: string;
  status: string;
  error: {
    error_type: string | null;
    code: string | null;
    message: string | null;
  };
};
