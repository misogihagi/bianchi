import Work from './work'
import Edit from './edit'


export function generateStaticParams() {
    return [
      { route: 'edit' },
      { route: 'work' },
    ]
  }
   
export default async function Page({
    params,
  }: {
    params: { route: string }
  }) {
  const { route } = await params
  return route ==='edit'
  ? <Edit />
  : <Work />
}
  