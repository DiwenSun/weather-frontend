import React from "react";
import {Button, Form, Input, Table} from "antd";
import {fetchData} from "../request/request";


const { Column } = Table;

interface IState{
    data?:WeatherData
}

interface WeatherData {
    Location: JSON;
    Current: JSON;
    forecast: Forecast;
}

interface Forecast {
    forecastday: Forecastday[];
}

interface Forecastday {
    date: Date;
    date_epoch: EpochTimeStamp;
    day: Day;
}

interface Day {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    maxwind_mph: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    totalprecip_in: number;
    avgvis_km: number;
    avgvis_miles: number;
    avghumidity: number;
    daily_will_it_rain: number;
    daily_chance_of_rain: number;
    daily_will_it_snow: number;
    daily_chance_of_snow: number;
    uv: number;
}

class Weather extends React.Component<any,IState> {

    constructor(props: any, context: any) {
        super(props, context);
        this.state = {}
    }

    render() {
        const onFinish = (values: any) => {
            console.log('Success:', values);
            fetchData(values.zipcode).then(res => {
                console.log(res.data)
                this.setState(res.data)
            })
        };

        const onFinishFailed = (errorInfo: any) => {
            console.log('Failed:', errorInfo);
        };

        return (
            <div className="Weather">
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Input Zipcode"
                        name="zipcode"
                        rules={[{ required: true, message: 'Please input your zipcode!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Get Weather Data
                        </Button>
                    </Form.Item>
                </Form>

                <Table<Forecastday>
                    id={"WTable"}
                    dataSource={this.state.data?.forecast.forecastday}
                >
                    <Column<Forecastday>
                        key="date"
                        title={"| Date: |"}
                        dataIndex="date"
                    />
                    <Column<Forecastday>
                        key="date"
                        title={"| Time: |"}
                        dataIndex="date_epoch"
                    />
                    <Column<Forecastday>
                        key="average temperature"
                        title={"| Average temperature: |"}
                        dataIndex={['day', 'avgtemp_c']}
                    />
                    <Column<Forecastday>
                        key="max temperature"
                        title={"| Max temperature: |"}
                        dataIndex={['day', 'maxtemp_c']}
                    />
                    <Column<Forecastday>
                        key="min temperature"
                        title={"| Min temperature: |"}
                        dataIndex={['day', 'mintemp_c']}
                    />
                    <Column<Forecastday>
                        key="chance rain"
                        title={"| Chance of rain: |"}
                        dataIndex={['day', 'daily_chance_of_rain']}
                    />
                    <Column<Forecastday>
                        key="chance snow"
                        title={"| Chance of snow: |"}
                        dataIndex={['day', 'daily_chance_of_snow']}
                    />
                </Table>
            </div>
        );
    }
}

export default Weather;