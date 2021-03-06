/**
 * useHosts
 * @author: oldj
 * @homepage: https://oldj.net
 */

import { actions } from '@renderer/core/agent'
import { IHostsBasicData, IHostsListObject } from '@root/common/data'
import version from '@root/version.json'
import { useState } from 'react'

export default function useHostsData() {
  const [hosts_data, setHostsData] = useState<IHostsBasicData>({
    list: [],
    trashcan: [],
    version,
  })

  const loadHostsData = async () => {
    setHostsData(await actions.localBasicDataGet())
  }

  const setList = async (list: IHostsListObject[]) => {
    list = list.filter(i => !i.is_sys)

    let data: IHostsBasicData = {
      list,
      trashcan: hosts_data.trashcan,
      version,
    }

    setHostsData(data)
    await actions.localListSet(list)
  }

  return {
    hosts_data,
    setHostsData,
    loadHostsData,
    setList,
  }
}
