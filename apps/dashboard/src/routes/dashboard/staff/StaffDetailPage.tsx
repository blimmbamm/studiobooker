import { useParams } from 'react-router-dom'

export default function StaffDetailPage() {
  const params = useParams<{id: string}>();
  return (
    <div>StaffDetailPage for staff with id {params.id}</div>
  )
}
