import styled from 'styled-components';
import { colors } from './index';

export const AddForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Asterisk = styled.span`
  color: ${colors.primary};
  font-weight: 800;
  font-family: var(--font-heading);
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  min-width: 300px;
`;

export const InputSubhead = styled.p`
  color: ${colors.white};
  font-family: var(--font-condensed);
  font-size: 2rem;
  margin-top: 0;
  margin-bottom: 1rem;
`;

export const InputLabel = styled.label`
  color: ${colors.white};
  font-family: var(--font-condensed);
  font-size: 1.8rem;
  letter-spacing: 0.05rem;
  margin-bottom: 1rem;
  padding: 0;
`;

export const TextInput = styled.input`
  appearance: none;
  background-color: ${colors.backgroundDark};
  border: none;
  border-bottom: 3px solid ${colors.white};
  border-radius: 4px 4px 0 0;
  color: ${colors.white};
  font-family: var(--font-condensed);
  font-size: 1.8rem;
  letter-spacing: 0.05rem;
  margin-bottom: 0.5rem;
  padding: 1.25rem 0.5rem;
  width: 100%;
  max-width: 35ch;
`;

export const TextAreaInput = styled.textarea`
  appearance: none;
  background-color: ${colors.backgroundDark};
  border: none;
  border-bottom: 3px solid ${colors.white};
  border-radius: 4px 4px 0 0;
  color: ${colors.white};
  font-family: var(--font-condensed);
  font-size: 1.8rem;
  letter-spacing: 0.05rem;
  margin-bottom: 0.5rem;
  padding: 1.25rem 0.5rem;
  width: 100%;
  max-width: 60ch;
  min-height: 18rem;
`;

export const NumberBlock = styled.div`
  display: flex;
  justify-content: flex-start;
  & > * + * {
    margin-left: 1rem;
  }
`;

export const NumberInput = styled(TextInput)`
  max-width: 5ch;
  min-height: 2rem;
  margin-right: 3rem;

  &::-webkit-inner-spin-button, 
  &::-webkit-outer-spin-button {
  -webkit-appearance: none; 
  margin: 0; 
  }
`;

export const ErrorText = styled.p`
  color: ${colors.danger};
  font-size: 1.4rem;
  letter-spacing: 0.05rem;
  min-height: 1.6rem;
  margin-top: 0;
`;

export const InputSelect = styled.select`
  appearance: none;
  color: ${colors.white};
  font-family: var(--font-condensed);
  background: ${colors.backgroundDark};
  border: 1px solid ${colors.white};
  border-radius: 4px;
  margin-bottom: 3rem;
  padding: 1rem 0.75rem;
  width: 85%;
  background-image: url(../../assets/images/chevron-down-solid.svg);
  background-repeat: no-repeat;
  background-position: 95% center;
  background-size: 1.4rem;
`;

export const InputOption = styled.option`
  appearance: none;
  color: ${colors.white};
  font-family: var(--font-condensed);
  background: ${colors.backgroundDark};
  padding: 0.75rem 0.5rem;
`;