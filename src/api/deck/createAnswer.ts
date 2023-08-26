import {Answer, PitchDeck} from './types';
import {DECKS_API_URL, QUESTION_API_URL, QUESTION_PARAM_DECK_ID, QUESTION_PARAM_QUESTION_ID} from './urlKeys';
import {MutationConfig, queryClient} from '../../lib/react-query';
import {useMutation} from '@tanstack/react-query';
import {QUERY_KEY_ANSWER} from './queryKeys';
import { axios } from '../../lib/axios';

export type CreateAnswerDTO = {
  deckId: number;
  questionId: number;
  answer: any;
};

export type CreateAnswerResponse = Answer;

export const createAnswer = (data: CreateAnswerDTO): Promise<CreateAnswerResponse> => {
  const path =  QUESTION_API_URL
    .replace(`:${QUESTION_PARAM_DECK_ID}`, String(data.deckId))
    .replace(`:${QUESTION_PARAM_QUESTION_ID}`, String(data.questionId)) + '/'

  return axios.post(path, { answer: data.answer });
};

type UseCreateAnswerOptions = {
  config?: MutationConfig<typeof createAnswer>;
};

export const useCreateAnswer = ({ config }: UseCreateAnswerOptions = {}) => {
  return useMutation({
    onMutate: async () => {
      await queryClient.cancelQueries([QUERY_KEY_ANSWER]);
    },
    ...config,
    mutationFn: createAnswer
  });
};
