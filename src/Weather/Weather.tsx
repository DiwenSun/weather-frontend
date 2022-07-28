import React from "react";
import {Button, Descriptions, Form, Input, Table, Image} from "antd";
import {fetchWeatherData} from "../request/request";
import "./Weather.css";

const {Column} = Table;

interface IState {
    data?: WeatherData
}

interface WeatherData {
    location: Location;
    current: Current;
    forecast: Forecast;
}

interface Forecast {
    forecastday: ForecastDay[];
}

interface ForecastDay {
    date: Date;
    date_epoch: EpochTimeStamp;
    day: Day;
}

interface Location {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: EpochTimeStamp;
    localtime: Date;
}

interface Current {
    last_updated_epoch: EpochTimeStamp;
    last_updated: Date;
    condition: Condition
    temp_c: number;
    temp_f: number;
    is_day: number;
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
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
    condition: Condition
    uv: number;
}

interface Condition {
    text: string;
    icon: string;
    code: number
}

class Weather extends React.Component<any, IState> {

    constructor(props: any, context: any) {
        super(props, context);
        this.state = {}
    }

    render() {
        const onFinish = (values: any) => {
            console.log('Success:', values);
            fetchWeatherData(values.zipcode) // values.{form item input name}
                .then(res => {
                    console.log(res.data)
                    this.setState(res.data) // setState( {field:value} ) <==> setState(Object)
                })
                .catch(err => {
                    console.log(err)
                    alert(err)
                })
        };

        const onFinishFailed = (errorInfo: any) => {
            console.log('Failed:', errorInfo);
        };

        return (
            <div className={"Weather"}>
                <div>
                    <Form
                        name="basic"
                        labelCol={{span: 8}}
                        wrapperCol={{span: 16}}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Input Zipcode"
                            name="zipcode"
                            rules={[{required: true, message: 'Please input your zipcode!'}]}
                        >
                            <Input/>
                        </Form.Item>
                        <br/>
                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button type="primary" htmlType="submit">
                                Get Weather Data
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <br/>

                {/*<Descriptions className={"description"} title={"Location Info:"} layout={'horizontal'} bordered={false}>*/}
                {/*    <Descriptions.Item label="| town: ">{this.state.data?.location.name}</Descriptions.Item>*/}
                {/*    <Descriptions.Item label="| region: ">{this.state.data?.location.region}</Descriptions.Item>*/}
                {/*    <Descriptions.Item label="| local time: ">{this.state.data?.location.localtime.toString()}</Descriptions.Item>*/}
                {/*</Descriptions>*/}

                <div className={"description"}>
                    <label>Location Info: </label>
                    <li>town: {this.state.data?.location.name}</li>
                    <li>region: {this.state.data?.location.region}</li>
                    <li>local time: {this.state.data?.location.localtime.toString()}</li>
                </div>
                <br/>

                {/*<Descriptions className={"description"} title={"Current Info: "} layout={'horizontal'} bordered={false}>*/}
                {/*    <Descriptions.Item label="| Weather Condition: ">{this.state.data?.current.condition.text}</Descriptions.Item>*/}
                {/*    <Descriptions.Item label="| temperature: ">{this.state.data?.current.temp_c}</Descriptions.Item>*/}
                {/*    <Descriptions.Item label="| wind speed: ">{this.state.data?.current.wind_kph}</Descriptions.Item>*/}
                {/*    <Descriptions.Item label="| wind direction: ">{this.state.data?.current.wind_dir}</Descriptions.Item>*/}
                {/*    <Descriptions.Item label="| humidity: ">{this.state.data?.current.humidity}</Descriptions.Item>*/}
                {/*</Descriptions>*/}

                <div className={"description"}>
                    <label>Current Info: </label>
                    <Image src={this.state.data?.current.condition.icon}/>
                    <li>Weather Condition: {this.state.data?.current.condition.text}</li>
                    <li>temperature: {this.state.data?.current.temp_c}</li>
                    <li>wind speed: {this.state.data?.current.wind_kph}</li>
                    <li>wind direction: {this.state.data?.current.wind_dir}</li>
                    <li>humidity: {this.state.data?.current.humidity}</li>
                </div>
                <br/>

                <div className={"table"}>
                    <Table<ForecastDay>
                        id={"WTable"}
                        dataSource={this.state.data?.forecast.forecastday}
                    >
                        <Column<ForecastDay>
                            key="date"
                            title={"| Date: |"}
                            dataIndex="date"
                        />
                        <Column<ForecastDay>
                            key="average temperature"
                            title={"| Average temperature: |"}
                            dataIndex={['day', 'avgtemp_c']}
                        />
                        <Column<ForecastDay>
                            key="max temperature"
                            title={"| Max temperature: |"}
                            dataIndex={['day', 'maxtemp_c']}
                        />
                        <Column<ForecastDay>
                            key="min temperature"
                            title={"| Min temperature: |"}
                            dataIndex={['day', 'mintemp_c']}
                        />
                        <Column<ForecastDay>
                            key="chance rain"
                            title={"| Chance of rain: |"}
                            dataIndex={['day', 'daily_chance_of_rain']}
                        />
                        <Column<ForecastDay>
                            key="chance snow"
                            title={"| Chance of snow: |"}
                            dataIndex={['day', 'daily_chance_of_snow']}
                        />
                    </Table>
                </div>
            </div>
        );
    }
}

export default Weather;