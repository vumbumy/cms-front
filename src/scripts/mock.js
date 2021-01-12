import {ITEMS_PER_PAGE} from "./const";

export const SAMPLE_TEXT = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
export function sampleTextList(offset = 0, items = ITEMS_PER_PAGE) {
    let start = offset * items
    let end = (offset + 1) * items

    return SAMPLE_TEXT.split(' ').slice(start, end)
}
export function sampleTextListLength(offset) {
    let start = offset * ITEMS_PER_PAGE

    return SAMPLE_TEXT.split(' ').splice(start).length
}

export const templateSample = {
    title: "일반광고계약양식-1",
    sections: [
        {title: "공통기본", order: 1},
        {title: "Advanced", order: 2},
        {title: "연결데이터", order: 3, parent: "Advanced"},
        {title: "입금스케쥴", order: 4, parent: "Advanced"},
        {title: "환불취소조건", order: 5, parent: "Advanced"},
    ],
    fields: [
        {title: "계약명", size: 0, type: "String", required: true, section: "공통기본"},
        {title: "계약자(갑)", size: 0, type: "String", required: true, section: "공통기본"},
        {title: "계약자(을)", size: 0, type: "String", required: true, section: "공통기본"},
        {title: "계약금액(원)", size: 0, type: "Number", required: true, section: "공통기본"},
        {title: "사업자번호/주민번호(갑)", size: 0, type: "String", required: true, section: "공통기본"},
        {title: "사업자번호/주민번호(을)", size: 0, type: "String", required: true, section: "공통기본"},
        {title: "광고상품명", size: 0, type: "String", required: false, section: "연결데이터"},
        {title: "입금기한일", size: 0, type: "Date", required: false, section: "입금스케쥴"},
        {title: "금액", size: 0, type: "Number", required: false, section: "입금스케쥴"},
        {title: "취소불가", size: 0, type: "Boolean", required: false, section: "환불취소조건"}
    ]
}
