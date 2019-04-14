const storage = window.localStorage
     ,SEARCH_KEY = 'SearchHistory',
    SEARCH_MAXLEN = 10

export function  GetSearch() {
  return  storage[SEARCH_KEY] ?  JSON.parse( storage[SEARCH_KEY] ) :  []
}

export function DelSearch ( v ) {
  let sear = GetSearch()
  if( v === undefined ) {
    storage.removeItem( SEARCH_KEY )
    sear = []
  } else {
    sear.splice( v, 1)
    storage[SEARCH_KEY] = JSON.stringify( sear )
  }
  return sear
}

export function s_history ( v ) {
  let searchkeylist  = GetSearch()

  insertArray(searchkeylist, v, (item) => {
    return item === v
  }, SEARCH_MAXLEN )

  storage[SEARCH_KEY] = JSON.stringify( searchkeylist )

  return searchkeylist

}

function insertArray ( arr, val, compare, maxlen ) {
  let index = arr.findIndex( compare )
  if( index ===  0) {
    return
  }
  if( index > 0) {
    arr.splice( index, 1)
  }
  arr.unshift( val )

  if( maxlen && arr.length > maxlen) {
    arr.pop()
  }
}

