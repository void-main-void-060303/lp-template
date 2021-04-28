import $ from 'jquery'

const isPC = () => window.matchMedia('(min-width:1024px)').matches

$('a.jsNavigationLink').on('click', (e) => {
  const $this = $(e.currentTarget)

  // 別ページへの遷移は処理終了
  const href = $this.attr('href')
  if (!href || href.substr(0, 1) !== '#') {
    return true
  }

  // TOPリンクはhtmlをリンク先にする
  const $target = $(href.slice(-1) === '#' ? 'html' : href)
  // pcはメニューの高さ分の余白を設定
  const menuHeight = isPC() ? 34 : 0
  // スクロールするY座標を計算
  const posY = $target.offset().top - menuHeight
  // モーダルを非表示
  $('#chkNavigation').prop('checked', false)
  $('body').removeClass('fixed')
  // スクロール
  $('html, body').animate({ scrollTop: posY }, 300, 'swing')
  // DOMの処理をオミット
  return false
})

// モーダルでスクロールをロック
$('.jsFixSwitch').on('change', (e) => {
  $('body').toggleClass('fixed', $(e.currentTarget).prop('checked'))
})

// リストスクロール
const scrollList = (selector, reverse, loop) => {
  const $target = $(selector)
  const targetWidth = $target[0].offsetWidth
  const $parent = $target.parent()
  const scrollLeft = $parent[0].scrollLeft
  const $children = $target.children()
  const moveX = $children[0].offsetWidth * (reverse ? -1 : 1)
  let scrollPosX = scrollLeft + moveX

  if (loop) {
    if (scrollPosX < 0) {
      // 最大値から1つ分を減算
      scrollPosX = targetWidth + moveX
    } else if (scrollPosX + $children.length >= targetWidth) {
      // ↑数字がintなので誤差分として子供の個数(1px)を加算
      // スクロール位置は初期値
      scrollPosX = 0
    }
  }

  $parent.animate({ scrollLeft: scrollPosX }, 300, 'swing')
}

// キャラクター逆
$('#btnCharPrevious').on('click', () => {
  scrollList('#lstCharacter', true, false)
})

// キャラクター順
$('#btnCharNext').on('click', () => {
  scrollList('#lstCharacter', false, false)
})

// 遊び方STEP逆
$('#btnPlayPrevious').on('click', () => {
  scrollList('#lstPlayStep', true, true)
})

// 遊び方STEP順
$('#btnPlayNext').on('click', () => {
  scrollList('#lstPlayStep', false, true)
})

// グッズ拡大画像スクロール
const scrollGoods = ($target, reverse) => {
  const $parent = $target.closest('.goods_popup_body')
  const scrollLeft = $parent[0].scrollLeft
  const moveX = (window.innerWidth / 2) * (reverse ? -1 : 1)
  const scrollPosX = scrollLeft + moveX

  $parent.animate({ scrollLeft: scrollPosX }, 300, 'swing')
}

$('[id^="btnGoodsScrollLeft"]').on('click', (e) => {
  const $this = $(e.currentTarget)
  scrollGoods($this, true)
})
$('[id^="btnGoodsScrallRight"]').on('click', (e) => {
  const $this = $(e.currentTarget)
  scrollGoods($this, false)
})

// アコーディオン
$('.jsAccordionSwitch').on('change', (e) => {
  const $this = $(e.currentTarget)
  $this.parent().find('.jsAccordionBody').slideToggle()
})

// 開催場所アコーディオン
$('.jsTicketSwitch').on('change', (e) => {
  const $this = $(e.currentTarget)
  $('.jsTicketSwitch').not($this).prop('checked', false)
  $('.jsTicketBody').slideUp()

  if ($this.prop('checked')) {
    $this.parent().find('.jsTicketBody').slideDown()
  }
})

// ナビゲーション用フェードインアニメーション
const fadeIn1 = () => {
  // メインヴィジュアルが見えなくなったら表示する
  const mv = document.querySelector('#mainVisual')
  if (mv) {
    const targetPosY = mv.offsetTop + mv.offsetHeight
    $('[class*="fadeIn1"]').toggleClass('show', window.pageYOffset > targetPosY)
  } else {
    $('[class*="fadeIn1"]').addClass('show')
  }
}

// タイトル用フェードインアニメーション
const fadeIn2 = () => {
  const triggerY = window.scrollY + window.innerHeight * 0.8

  $('[class*="fadeIn2"]')
    .not('.show')
    .each((index, element) => {
      if (element.offsetTop < triggerY) {
        $(element).addClass('show')
      }
    })
}

$(window).on('load scroll', () => {
  fadeIn1()
  fadeIn2()
})

// スライドするかどうかの判定
const jugdeSlide = () => {
  const $slideList = $('.jsSlide ul')
  $slideList.each((index, element) => {
    const $ele = $(element)
    const $parent = $ele.parent()
    if ($parent.width() < $ele.width()) {
      $parent.addClass('slide').append($ele.clone())
    }
  })
}

/*
main
*/
jugdeSlide()
