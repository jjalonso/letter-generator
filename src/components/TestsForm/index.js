import React from 'react';
import { Row, Col, Form } from 'antd';
import Editor from '../Editor';
import RiskWidget from '../RiskWidget';
import CognitiveWidget from '../CognitiveWidget';
import Field from '../Field';

const TestForm = () => (
  <Form
    autoComplete="off"
    labelAlign="left"
    colon={false}
  >
    <Row>
      <Col span={24}>
        <Field
          name="examination"
          render={(field, error) => (
            <Form.Item
              label="Mental health examination *"
              {...error}
            >
              <Editor
                placeholder="Describe the patient mental health examination"
                {...field}
              />
            </Form.Item>
          )}
        />
      </Col>

      <Col span={24}>
        <Field
          name="cognitive"
          render={(field, error) => (
            <Form.Item
              label="Cognitive test result *"
              {...error}
            >
              <CognitiveWidget {...field} />
            </Form.Item>
          )}
        />
      </Col>
    </Row>

    <Row>
      <Col span={24}>
        <Field
          name="risks"
          render={(field, error) => (
            <Form.Item
              label="Risk assestment"
              {...error}
            >
              <Row>
                <RiskWidget {...field} />
              </Row>
            </Form.Item>
          )}
        />
      </Col>
    </Row>
  </Form>
);

export default TestForm;
