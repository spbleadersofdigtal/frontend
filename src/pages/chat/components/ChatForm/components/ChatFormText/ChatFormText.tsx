import clsx from 'clsx';
import {ReactFCC} from '../../../../../../utils/ReactFCC';
import {Textarea, TextAreaProps} from '../../../../../../components/Textarea';
import {KeyboardEvent} from 'react';
import {isKey} from '../../../../../../utils/isKey';
import {Key} from 'ts-key-enum';
import {Button} from '../../../../../../components/Button';
import {ReactComponent as RightIcon} from '../../../../../../assets/icons/right.svg';
import {EntityType, Hint} from '../../../../../../api/deck';
import s from './ChatFormText.module.scss';
import {Hint as HintCmp, HintsContainer} from '../../../../../../components/Hint';
import {Input, InputProps} from '../../../../../../components/Input';

export interface ChatFormTextProps {
  className?: string;
  onSubmit: (e: any) => void;
  registration?: TextAreaProps['registration'];
  setValue: (value: any) => void;
  hint?: Hint | false;
  type: InputProps['type'] | 'textarea';
}

export const ChatFormText: ReactFCC<ChatFormTextProps> = (props) => {
  const {className, onSubmit, registration, hint, setValue, type} = props;

  return (
    <div className={s.ChatFormText}>
      <HintsContainer isLoading={hint && !hint.value}>
        {hint && hint.type !== EntityType.cards && hint.value && (
          <>{Array.isArray(hint.value) ? hint.value.map((item: string, index: number) => (
            <HintCmp onClick={() => setValue(item)} key={index}>{item}</HintCmp>
          )) : (
            <HintCmp onClick={() => setValue(hint.value)}>{hint.value}</HintCmp>
          )}</>
        )}
      </HintsContainer>

      <div className={clsx(s.ChatFormText__richInput, className)}>
        {type === 'textarea' ? (
          <Textarea
            className={s.ChatFormText__input}
            placeholder={'Введите сообщение'}
            rows={1}
            onKeyDown={(e: KeyboardEvent) => {
              if (isKey(e.nativeEvent, Key.Enter)) {
                e.preventDefault();
                onSubmit(e);
              }
            }}
            registration={registration}
          />
        ) : (
          <Input
            className={s.ChatFormText__input}
            type={type}
            placeholder={'Введите сообщение'}
            onKeyDown={(e: KeyboardEvent) => {
              if (isKey(e.nativeEvent, Key.Enter)) {
                e.preventDefault();
                onSubmit(e);
              }
            }}
            registration={registration}
          />
        )}

        <Button className={s.ChatFormText__richInputButton} onClick={onSubmit}>
          <RightIcon className={s.ChatFormText__buttonIcon} />
        </Button>
      </div>
    </div>
  );
};

