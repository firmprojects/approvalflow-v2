import { RequestStatus } from '../types';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

export function getStatusIcon(status: RequestStatus) {
  switch (status) {
    case RequestStatus.PENDING:
      return <Clock className="h-4 w-4 text-yellow-500" />;
    case RequestStatus.APPROVED:
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case RequestStatus.REJECTED:
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return <Clock className="h-4 w-4 text-gray-500" />;
  }
}