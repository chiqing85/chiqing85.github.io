const storage = window.localStorage
     ,SEARCH_KEY = 'SearchHistory',
     SET_PLAYLISTHISTORY = 'PlHistory',
    SEARCH_MAXLEN = 10

export function  GetSearch( key ) {
  return  storage[ key ] ?  JSON.parse( storage[ key ] ) :  []
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
  let searchkeylist  = GetSearch( SEARCH_KEY )
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

export function splisth( v ) {
  let plhi = GetSearch(SET_PLAYLISTHISTORY)
  insertArrays( plhi, v, ( item ) => {
    return item.mid === v.mid
  }, 100 )
  storage[SET_PLAYLISTHISTORY] = JSON.stringify( plhi )
  return plhi
}

function insertArrays( arr, v, compare, mx) {
  let i = arr.findIndex( compare )
  if( i === 0) return
  if(i > 0 ) arr.splice( i, 1)
  arr.unshift( v )
  if (mx && arr.length > mx ) arr.pop()
}
