import {Answer, EntityType} from '../../../api/deck';
import {currencyFormatter, formatDate} from '../../../utils/fomat';
import {slugsForFormat} from '../components/ChatForm/components/ChatFormMultipleRange';

export const generateTextFromAnswer = (type: EntityType, answer: Answer) => {
  switch (type) {
    case EntityType.text:
      return answer.answer;
    case EntityType.number:
      return answer.answer;
    case EntityType.date:
      return formatDate(answer.answer);
    case EntityType.link:
      return answer.answer;
    case EntityType.select:
      return answer.answer;
    case EntityType.multiple_range:
      return Object.entries(answer.answer)
        .map(([key, value]: any) => slugsForFormat.includes(key) ? currencyFormatter.format(value) : value).join('\n');
    case EntityType.multiple_date_description:
      return Object.entries(answer.answer).map(([key, value]) => `${formatDate(new Date(key))}: ${value}`).join('\n');
    case EntityType.range:
      const [slug, value]: any = Object.entries(answer.answer)[0];
      return slugsForFormat.includes(slug) ?
        currencyFormatter.format(value) : value
    case EntityType.multiple_link_description:
      return Object.entries(answer.answer).map(([key, value]) => `${key}: ${value}`).join('\n');
    default:
      return '';
  }
}