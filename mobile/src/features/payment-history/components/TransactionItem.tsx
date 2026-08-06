import { View, Text, StyleSheet } from "react-native";
import {
	CheckCircle,
	Clock,
	AlertCircle,
	CreditCard,
} from "lucide-react-native";
import { toPHP } from "@/utils/moneyConverter";


export default function TransactionItem({ txn }: any) {
	const statusConfig:any = {
		Paid:{
		color:"#16a34a",
		bg:"#dcfce7",
		icon:CheckCircle,
		},

		Pending:{
		color:"#f59e0b",
		bg:"#fef3c7",
		icon:Clock,
		},

		Failed:{
		color:"#ef4444",
		bg:"#fee2e2",
		icon:AlertCircle,
		},
	};

	const config = statusConfig[txn.status] ?? statusConfig.Paid;
	const StatusIcon = config.icon;

	return (
		<View style={styles.card}>
			{/* TOP */}
			<View style={styles.row}>
				<View style={styles.planIcon}>
					<CreditCard
					size={18}
					color="#10b981"
					/>
				</View>

				<View style={{flex:1}}>

					<Text style={styles.plan}>
					{txn.plan}
					</Text>

					<Text style={styles.method}>
					{txn.paymentMethod}
					</Text>

				</View>

				<View style={styles.right}>


					<Text style={styles.amount}>
					{toPHP(txn.amount)}
					</Text>


					<View
					style={[
						styles.status,
						{
							backgroundColor:config.bg
						}
					]}
					>

					<StatusIcon
						size={11}
						color={config.color}
					/>

					<Text
						style={[
							styles.statusText,
							{
							color:config.color
							}
						]}
					>
						{txn.status}
					</Text>

					</View>


				</View>
			</View>

			{/* BOTTOM */}
			<View style={styles.footer}>
				<Text style={styles.label}>Payment Date</Text>

				<Text style={styles.date}>
					{new Date(txn.datePaid).toLocaleDateString(
					"en-US",
					{
						month:"short",
						day:"numeric",
						year:"numeric"
					}
					)}
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({

  card:{
    backgroundColor:"#fff",
    borderRadius:14,
    padding:14,
    marginBottom:10,

    borderWidth:1,
    borderColor:"#f1f5f9",
  },


  row:{
    flexDirection:"row",
    alignItems:"center",
  },


  planIcon:{
    width:38,
    height:38,
    borderRadius:12,

    backgroundColor:"#ecfdf5",

    alignItems:"center",
    justifyContent:"center",

    marginRight:10,
  },


  plan:{
    fontSize:14,
    fontWeight:"700",
    color:"#0f172a",
  },


  method:{
    marginTop:3,
    fontSize:12,
    color:"#64748b",
  },


  right:{
    alignItems:"flex-end",
  },


  amount:{
    fontSize:15,
    fontWeight:"800",
    color:"#0f172a",
  },


  status:{
    flexDirection:"row",
    alignItems:"center",

    gap:4,

    paddingHorizontal:8,
    paddingVertical:3,

    borderRadius:8,

    marginTop:5,
  },


  statusText:{
    fontSize:10,
    fontWeight:"700",
  },


  footer:{
    marginTop:12,
    paddingTop:10,

    borderTopWidth:1,
    borderColor:"#f1f5f9",

    flexDirection:"row",
    justifyContent:"space-between",
  },


  label:{
    fontSize:11,
    color:"#94a3b8",
  },


  date:{
    fontSize:12,
    fontWeight:"600",
    color:"#334155",
  },

});