import { RootPage } from '@payloadcms/next/views'
import config from '../../../../../payload.config'
import { importMap } from '../importMap'

export default function Page({ params, searchParams }: any) {
  return <RootPage config={config} importMap={importMap} params={params} searchParams={searchParams} />
}
