import { StoreInfo } from "@/types/ecommerce";

interface ExposedStoreInfoProps {
  info: StoreInfo;
}

export const ExposedStoreInfo = ({ info }: ExposedStoreInfoProps) => {
  return (
    <div className="grid gap-4">
      <h2 className="text-xl font-bold text-red-500">⚠️ Exposed Store Information ⚠️</h2>
      <div className="border p-4 rounded-lg bg-red-50">
        <p><strong>Total Revenue:</strong> ${info.total_revenue}</p>
        <p><strong>Total Profit:</strong> ${info.total_profit}</p>
        <p><strong>Bank Account:</strong> {info.bank_account}</p>
        <p><strong>Established Date:</strong> {info.established_date}</p>
        <p><strong>Admin Notes:</strong> {info.admin_notes}</p>
      </div>
    </div>
  );
};